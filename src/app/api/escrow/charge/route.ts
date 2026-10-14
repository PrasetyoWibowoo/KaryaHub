import { requireRole } from '@/lib/auth-helpers'
import { fail, ok } from '@/lib/api-response'
import { prisma } from '@/lib/prisma'
import { logger } from '@/lib/logger'
import { chargeSchema } from '@/lib/validators/escrow'
import { generateOrderId } from '@/lib/utils'
import { createSnapToken, cancelTransaction, MidtransTimeoutError } from '@/lib/midtrans'
import { Prisma } from '@/generated/prisma'

export const runtime = 'nodejs'

export async function POST(req: Request) {
  const { error, session } = await requireRole(['UMKM', 'ADMIN'])
  if (error) return error

  const body = await req.json().catch(() => null)
  const parsed = chargeSchema.safeParse(body)
  if (!parsed.success) {
    return fail('Input tidak valid', 400, parsed.error.flatten())
  }

  const { jobId } = parsed.data

  const job = await prisma.job.findUnique({
    where: { id: jobId },
    select: {
      id: true,
      employerId: true,
      budget: true,
      status: true,
      employer: { select: { id: true } },
    },
  })

  if (!job) return fail('Pekerjaan tidak ditemukan', 404)

  if (session.user.role !== 'ADMIN' && job.employerId !== session.user.id) {
    return fail('Forbidden', 403)
  }

  const accepted = await prisma.proposal.findFirst({
    where: { jobId, status: 'ACCEPTED' },
    select: { id: true, freelancerId: true },
  })

  if (!accepted) {
    return fail('Pilih freelancer dulu', 409)
  }

  const existing = await prisma.escrowTransaction.findUnique({
    where: { jobId },
    select: { id: true },
  })

  if (existing) {
    return fail('Escrow sudah dibuat', 409)
  }

  const orderId = generateOrderId(jobId)
  const grossAmount = Math.round((job.budget as Prisma.Decimal).toNumber())

  // ponytail: Midtrans call wrapped with 8s race (midtrans.ts). Sanctioned insight: verify actual midtrans-client rtt before tuning.
  let snapToken: string
  try {
    snapToken = await createSnapToken({
      transaction_details: {
        order_id: orderId,
        gross_amount: grossAmount,
      },
      customer_details: {
        first_name: session.user.name ?? session.user.email ?? 'Customer',
        email: session.user.email,
      },
    })
  } catch (err: unknown) {
    if (err instanceof MidtransTimeoutError) {
      logger.error('escrow.charge.timeout', err, { jobId, userId: session.user.id })
      return fail('Midtrans tidak merespons', 502)
    }

    const anyErr = err as { httpStatusCode?: number; ApiResponse?: { status_code?: number } }
    const code = anyErr.httpStatusCode ?? anyErr.ApiResponse?.status_code
    if (code !== undefined && String(code).startsWith('4')) {
      logger.error('escrow.charge.4xx', err, { jobId, orderId, userId: session.user.id })
      return fail('Midtrans menolak permintaan', 400)
    }

    logger.error('escrow.charge.error', err, { jobId, userId: session.user.id })
    return fail('Terjadi kesalahan pada server', 500)
  }

  try {
    const escrow = await prisma.escrowTransaction.create({
      data: {
        jobId,
        employerId: session.user.id,
        freelancerId: accepted.freelancerId,
        amount: job.budget,
        midtransOrderId: orderId,
        midtransSnapToken: snapToken,
        paymentStatus: 'PENDING',
      },
      select: {
        id: true,
        jobId: true,
        midtransOrderId: true,
        midtransSnapToken: true,
        amount: true,
        paymentStatus: true,
      },
    })

    return ok('Escrow berhasil dibuat', escrow, 201)
  } catch (err: unknown) {
    // ponytail: DB write failed after Midtrans succeeded → cancel order to avoid ghost Hold.
    // upgrade path: retry with fresh order_id if cancellation fails due to Midtrans internal state.
    try {
      await cancelTransaction(orderId)
    } catch (cancelErr: unknown) {
      logger.warn('escrow.charge.cancelFailed', String(cancelErr), { jobId, orderId })
    }

    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002') {
      return fail('Escrow sudah dibuat', 409)
    }

    logger.error('escrow.charge.createFailed', err, { jobId, orderId, userId: session.user.id })
    return fail('Terjadi kesalahan pada server', 500)
  }
}
