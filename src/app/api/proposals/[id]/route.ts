import { fail, ok } from '@/lib/api-response'
import { prisma } from '@/lib/prisma'
import { logger } from '@/lib/logger'
import { requireRole } from '@/lib/auth-helpers'
import { decisionSchema } from '@/lib/validators/proposal'

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { error, session } = await requireRole(['UMKM', 'ADMIN'])
  if (error) return error

  const { id } = await params

  const body = await req.json().catch(() => null)
  const parsed = decisionSchema.safeParse(body)
  if (!parsed.success) {
    return fail('Input tidak valid', 400, parsed.error.flatten())
  }

  const { status } = parsed.data

  try {
    const proposal = await prisma.$transaction(async (tx) => {
      const existing = await tx.proposal.findUnique({
        where: { id },
        select: {
          id: true,
          status: true,
          jobId: true,
          freelancerId: true,
          job: { select: { employerId: true, title: true } },
        },
      })

      if (!existing) {
        throw fail('Proposal tidak ditemukan', 404)
      }

      if (session.user.role !== 'ADMIN' && existing.job.employerId !== session.user.id) {
        throw fail('Forbidden', 403)
      }

      if (existing.status !== 'PENDING') {
        throw fail('Hanya proposal PENDING yang bisa diproses', 409)
      }

      if (status === 'ACCEPTED') {
        const accepted = await tx.proposal.findFirst({
          where: { jobId: existing.jobId, status: 'ACCEPTED' },
        })
        if (accepted) {
          throw fail('Sudah ada proposal yang diterima untuk pekerjaan ini', 409)
        }
      }

      const updated = await tx.proposal.update({
        where: { id },
        data: { status },
        select: {
          id: true,
          jobId: true,
          status: true,
          bidAmount: true,
          estimatedDays: true,
          createdAt: true,
          updatedAt: true,
        },
      })

      await tx.notification.create({
        data: {
          userId: existing.freelancerId,
          title: status === 'ACCEPTED' ? 'Proposal Diterima' : 'Proposal Ditolak',
          message:
            status === 'ACCEPTED'
              ? `Selamat! Proposal kamu untuk "${existing.job.title}" diterima.`
              : `Proposal kamu untuk "${existing.job.title}" ditolak.`,
        },
      })

      return updated
    })

    return ok('Proposal berhasil diproses', proposal)
  } catch (err: unknown) {
    if (err instanceof Response) return err
    logger.error('proposals.decision', err, { proposalId: id, userId: session.user.id })
    return fail('Terjadi kesalahan pada server', 500)
  }
}
