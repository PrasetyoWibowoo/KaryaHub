import { requireAuth, requireRole } from '@/lib/auth-helpers'
import { ok, fail } from '@/lib/api-response'
import { prisma } from '@/lib/prisma'
import { logger } from '@/lib/logger'

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
    include: {
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
  const { error, session } = await requireRole(['FREELANCER'])
  if (error) return error

  try {
    const body = await req.json().catch(() => null)
    if (!body?.jobId) return fail('jobId wajib diisi', 400)

    const proposal = await prisma.proposal.create({
      data: {
        jobId: body.jobId,
        freelancerId: session.user.id,
        coverLetter: body.coverLetter || null,
        bidAmount: body.bidAmount,
        estimatedDays: body.estimatedDays,
      },
    })

    return ok('Proposal berhasil dikirim', proposal, 201)
  } catch (err: any) {
    if (err.code === 'P2002') {
      return fail('Proposal sudah pernah dikirim untuk job ini', 409)
    }
    logger.error('proposals.create', err, { userId: session.user.id })
    return fail('Terjadi kesalahan pada server', 500)
  }
}
