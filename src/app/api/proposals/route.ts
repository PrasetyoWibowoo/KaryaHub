import { requireAuth, requireRole } from '@/lib/auth-helpers'
import { ok, fail } from '@/lib/api-response'
import { prisma } from '@/lib/prisma'
import { logger } from '@/lib/logger'
import { createProposalSchema, proposalQuerySchema } from '@/lib/validators/proposal'
import { Prisma } from '@/generated/prisma'

export const runtime = 'nodejs'

const proposalSelect = {
  id: true,
  status: true,
  bidAmount: true,
  estimatedDays: true,
  coverLetter: true,
  createdAt: true,
  job: {
    select: {
      id: true,
      title: true,
      budget: true,
    },
  },
  freelancer: {
    select: {
      id: true,
      fullName: true,
    },
  },
} as const

export async function GET(req: Request) {
  const { error, session } = await requireAuth()
  if (error) return error

  const url = new URL(req.url)
  const parsed = proposalQuerySchema.safeParse({
    jobId: url.searchParams.get('jobId'),
    page: url.searchParams.get('page'),
    limit: url.searchParams.get('limit'),
  })

  if (!parsed.success) {
    return fail('Query parameter tidak valid', 400, parsed.error.flatten())
  }

  const { jobId, page, limit } = parsed.data
  const role = session.user.role as string

  // ponytail: PENDING tetap di DB, tapi "hilang sendiri" saat job bukan OPEN.
  // upgrade path: tambah kolom expiresAt/cron bila perlu expiry berbasis waktu.
  const hidePendingIfNotOpen: Prisma.ProposalWhereInput = {
    OR: [{ status: { not: 'PENDING' } }, { job: { status: 'OPEN' } }],
  }

  let where: Prisma.ProposalWhereInput

  if (role === 'FREELANCER') {
    where = { freelancerId: session.user.id, ...hidePendingIfNotOpen }
  } else if (role === 'UMKM') {
    if (!jobId) return fail('Parameter jobId wajib untuk UMKM', 400)

    const job = await prisma.job.findUnique({
      where: { id: jobId },
      select: { employerId: true },
    })

    if (!job) return fail('Pekerjaan tidak ditemukan', 404)
    if (job.employerId !== session.user.id) return fail('Forbidden', 403)

    where = { jobId, ...hidePendingIfNotOpen }
  } else {
    // ADMIN: semua proposal, filter jobId opsional
    where = { ...(jobId ? { jobId } : {}), ...hidePendingIfNotOpen }
  }

  const skip = (page - 1) * limit

  const [proposals, total] = await Promise.all([
    prisma.proposal.findMany({
      where,
      select: proposalSelect,
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
    }),
    prisma.proposal.count({ where }),
  ])

  return ok('Daftar proposal', {
    proposals,
    pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
  })
}

export async function POST(req: Request) {
  const { error, session } = await requireRole(['FREELANCER', 'ADMIN'])
  if (error) return error

  const body = await req.json().catch(() => null)
  const parsed = createProposalSchema.safeParse(body)
  if (!parsed.success) {
    return fail('Input tidak valid', 400, parsed.error.flatten())
  }

  const { jobId, coverLetter, bidAmount, estimatedDays } = parsed.data

  try {
    // Verify job exists and is OPEN
    const job = await prisma.job.findUnique({
      where: { id: jobId },
      select: { status: true, employerId: true, title: true },
    })

    if (!job) return fail('Pekerjaan tidak ditemukan', 404)
    if (job.status !== 'OPEN') return fail('Pekerjaan tidak menerima proposal saat ini', 409)

    const proposal = await prisma.$transaction(async (tx) => {
      const newProposal = await tx.proposal.create({
        data: {
          jobId,
          freelancerId: session.user.id,
          coverLetter: coverLetter ?? null,
          bidAmount: new Prisma.Decimal(bidAmount),
          estimatedDays,
        },
        select: {
          id: true,
          jobId: true,
          status: true,
          bidAmount: true,
          estimatedDays: true,
          coverLetter: true,
          createdAt: true,
        },
      })

      await tx.notification.create({
        data: {
          userId: job.employerId,
          title: 'Proposal Baru Masuk',
          message: `Ada freelancer baru yang melamar untuk pekerjaan "${job.title}".`,
        },
      })

      return newProposal
    })

    return ok('Proposal berhasil dikirim', proposal, 201)
  } catch (err: unknown) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002') {
      return fail('Kamu sudah mengirim proposal untuk pekerjaan ini', 409)
    }
    logger.error('proposals.create', err, { userId: session.user.id })
    return fail('Terjadi kesalahan pada server', 500)
  }
}
