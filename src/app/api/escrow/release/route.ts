import { requireRole } from '@/lib/auth-helpers'
import { fail, ok } from '@/lib/api-response'
import { prisma } from '@/lib/prisma'
import { logger } from '@/lib/logger'
import { releaseSchema } from '@/lib/validators/escrow'

export const runtime = 'nodejs'

export async function POST(req: Request) {
  const { error, session } = await requireRole(['UMKM', 'ADMIN'])
  if (error) return error

  const body = await req.json().catch(() => null)
  const parsed = releaseSchema.safeParse(body)
  if (!parsed.success) {
    return fail('Input tidak valid', 400, parsed.error.flatten())
  }

  const { jobId } = parsed.data

  const job = await prisma.job.findUnique({
    where: { id: jobId },
    select: { id: true, employerId: true, status: true },
  })

  if (!job) return fail('Pekerjaan tidak ditemukan', 404)

  if (session.user.role !== 'ADMIN' && job.employerId !== session.user.id) {
    return fail('Forbidden', 403)
  }

  const submission = await prisma.jobSubmission.findFirst({
    where: { jobId, status: 'APPROVED' },
    select: { id: true, freelancerId: true },
  })

  if (!submission) {
    return fail('Submission belum disetujui', 409)
  }

  const escrow = await prisma.escrowTransaction.findUnique({
    where: { jobId },
    select: { id: true, paymentStatus: true, freelancerId: true },
  })

  if (!escrow) return fail('Escrow tidak ditemukan', 404)
  if (escrow.paymentStatus !== 'HELD_IN_ESCROW') {
    return fail('Escrow belum dalam status HELD', 409)
  }

  try {
    await prisma.$transaction(async (tx) => {
      // ponytail: idempoten via where paymentStatus. Upgrade: DB partial unique / row lock bila perlu race.
      const freshEscrow = await tx.escrowTransaction.findUnique({
        where: { id: escrow.id },
        select: { paymentStatus: true },
      })

      if (!freshEscrow || freshEscrow.paymentStatus !== 'HELD_IN_ESCROW') {
        throw new Error('Escrow sudah tidak dalam status HELD')
      }

      await tx.escrowTransaction.update({
        where: { id: escrow.id },
        data: { paymentStatus: 'RELEASED' },
      })

      await tx.job.update({
        where: { id: jobId },
        data: { status: 'COMPLETED' },
      })

      const freelancerId = escrow.freelancerId ?? submission.freelancerId

      await tx.notification.createMany({
        data: [
          {
            userId: session.user.id,
            title: 'Proyek Selesai',
            message: `Dana untuk pekerjaan ${jobId} telah dilepas. Proyek diselesaikan.`,
          },
          {
            userId: freelancerId,
            title: 'Dana Diterima',
            message: `Dana untuk pekerjaan telah dilepas. Selamat!`,
          },
        ],
      })
    })
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : ''
    if (msg.includes('sudah tidak dalam status HELD')) {
      return fail('Escrow sudah tidak dalam status HELD', 409)
    }
    logger.error('escrow.release.txFailed', err, { jobId, userId: session.user.id })
    return fail('Terjadi kesalahan pada server', 500)
  }

  return ok('Dana berhasil dilepas', { jobId, status: 'RELEASED' })
}
