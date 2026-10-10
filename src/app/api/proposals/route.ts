import { requireAuth, requireRole } from '@/lib/auth-helpers'
import { ok, fail } from '@/lib/api-response'
import { prisma } from '@/lib/prisma'
import { logger } from '@/lib/logger'
import { createProposalSchema } from '@/lib/validators/proposal'
import { Prisma } from '@/generated/prisma'

export const runtime = 'nodejs'

export async function GET() {
  const { error, session } = await requireAuth()
  if (error) return error

  const proposals = await prisma.proposal.findMany({
    where: {
      OR: [
        { freelancerId: session.user.id },
        { job: { employerId: session.user.id } },
      ],
    },
    select: {
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
    },
    orderBy: { createdAt: 'desc' },
  })

  return ok('Daftar proposal', proposals)
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
