import { createHash, timingSafeEqual } from 'node:crypto'
import { prisma } from '@/lib/prisma'
import { logger } from '@/lib/logger'
import { fail, ok } from '@/lib/api-response'
import { Prisma } from '@/generated/prisma'

export const runtime = 'nodejs'

function verifySignature({
  orderId,
  statusCode,
  grossAmount,
  signatureKey,
}: {
  orderId: string
  statusCode: string
  grossAmount: string
  signatureKey: string
}): boolean {
  const serverKey = process.env.MIDTRANS_SERVER_KEY ?? ''
  const raw = `${orderId}${statusCode}${grossAmount}${serverKey}`
  const hash = createHash('sha512').update(raw).digest('hex')

  const a = Buffer.from(hash, 'utf8')
  const b = Buffer.from(signatureKey, 'utf8')
  if (a.length !== b.length) return false
  return timingSafeEqual(a, b)
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null)

  if (
    !body ||
    typeof body.order_id !== 'string' ||
    typeof body.status_code !== 'string' ||
    typeof body.gross_amount !== 'string' ||
    typeof body.signature_key !== 'string' ||
    typeof body.transaction_status !== 'string'
  ) {
    return fail('Input tidak valid', 400)
  }

  const {
    order_id: orderId,
    status_code: statusCode,
    gross_amount: grossAmount,
    signature_key: signatureKey,
    transaction_status: transactionStatus,
    fraud_status: fraudStatus,
  } = body as {
    order_id: string
    status_code: string
    gross_amount: string
    signature_key: string
    transaction_status: string
    fraud_status?: string
  }

  // 1. Verify signature (constant-time).
  if (!verifySignature({ orderId, statusCode, grossAmount, signatureKey })) {
    const ip = req.headers.get('x-forwarded-for') ?? req.headers.get('x-real-ip') ?? 'unknown'
    logger.error('webhook.signatureInvalid', { ip, orderId }, { webhook: true })
    return fail('Signature tidak valid', 403)
  }

  // 2. Lookup escrow by order_id.
  const escrow = await prisma.escrowTransaction.findUnique({
    where: { midtransOrderId: orderId },
    select: {
      id: true,
      jobId: true,
      amount: true,
      paymentStatus: true,
      employerId: true,
      freelancerId: true,
      job: { select: { status: true } },
    },
  })

  if (!escrow) {
    logger.warn('webhook.orderNotFound', null, { orderId })
    return fail('Order tidak ditemukan', 404)
  }

  // 3. Compare gross_amount as Decimal (never string/float/number).
  const dbAmount = escrow.amount as Prisma.Decimal
  const webhookAmount = new Prisma.Decimal(grossAmount)
  if (!dbAmount.equals(webhookAmount)) {
    logger.error('webhook.amountMismatch', { db: dbAmount.toString(), webhook: grossAmount }, { orderId, escrowId: escrow.id })
    return fail('Amount tidak sesuai', 400)
  }

  // 4. Idempoten: paymentStatus != PENDING → 200, no reprocess.
  if (escrow.paymentStatus !== 'PENDING') {
    logger.info('webhook.idempotent', { orderId, status: escrow.paymentStatus })
    return ok('Webhook sudah diproses sebelumnya', { orderId, paymentStatus: escrow.paymentStatus })
  }

  // 5. Map status — REFUNDED never set by webhook (only refund instruction).
  //    Handles: settlement/capture family, expire, deny/cancel, plus challenge/authorize/pending no-ops.
  let escrowStatus: 'HELD_IN_ESCROW' | 'EXPIRED' | 'FAILED' | null = null
  let jobStatus: 'IN_PROGRESS' | null = null

  switch (transactionStatus) {
    case 'settlement':
      escrowStatus = 'HELD_IN_ESCROW'
      jobStatus = 'IN_PROGRESS'
      break

    case 'capture': {
      const fraud = fraudStatus ?? ''
      if (fraud === 'accept') {
        escrowStatus = 'HELD_IN_ESCROW'
        jobStatus = 'IN_PROGRESS'
      } else if (fraud === 'challenge') {
        logger.warn('webhook.captureChallenge', { orderId, fraudStatus }, { escrowId: escrow.id })
        return ok('Capture challenge — menunggu verifikasi manual', { orderId, fraudStatus })
      } else if (fraud === 'deny') {
        escrowStatus = 'FAILED'
      } else {
        // fraud_status empty or unknown → treat as challenge
        logger.error('webhook.captureUnknownFraud', { orderId, fraudStatus }, { escrowId: escrow.id })
        return ok('Capture fraud_status tidak dikenal — menunggu verifikasi', { orderId, fraudStatus })
      }
      break
    }

    case 'expire':
      escrowStatus = 'EXPIRED'
      break

    case 'deny':
    case 'cancel':
      escrowStatus = 'FAILED'
      break

    case 'pending':
    case 'authorize':
      logger.info('webhook.noop', { orderId, transactionStatus })
      return ok('Webhook diterima', { orderId, transactionStatus })

    case 'refund':
    case 'partial_refund':
    case 'chargeback':
      logger.error('webhook.unhandledRefund', { orderId, transactionStatus }, { escrowId: escrow.id })
      return ok('Webhook ditahan — menunggu instruksi refund terpisah', { orderId, transactionStatus })

    default:
      logger.warn('webhook.unknownStatus', { orderId, transactionStatus, fraudStatus }, { escrowId: escrow.id })
      return ok('Webhook diterima', { orderId, transactionStatus })
  }

  if (!escrowStatus) return ok('Webhook diterima', { orderId, transactionStatus })

  // 6. Atomic update — re-read paymentStatus inside TX (same escrow row).
  try {
    await prisma.$transaction(async (tx) => {
      const fresh = await tx.escrowTransaction.findUnique({
        where: { id: escrow.id },
        select: { paymentStatus: true },
      })

      if (!fresh || fresh.paymentStatus !== 'PENDING') {
        logger.info('webhook.txIdempotent', { orderId, status: fresh?.paymentStatus })
        return
      }

      await tx.escrowTransaction.update({
        where: { id: escrow.id },
        data: { paymentStatus: escrowStatus },
      })

      if (jobStatus) {
        await tx.job.update({
          where: { id: escrow.jobId },
          data: { status: jobStatus },
        })
      }

      // settlement/capture+accept → HELD_IN_ESCROW: notify employer+freelancer
      if (escrowStatus === 'HELD_IN_ESCROW') {
        const freelancerId = escrow.freelancerId
        const employerId = escrow.employerId

        await tx.notification.createMany({
          data: [
            { userId: employerId, title: 'Pembayaran Berhasil', message: `Pembayaran untuk order ${orderId} berhasil ditahan di escrow.` },
            ...(freelancerId
              ? [
                  {
                    userId: freelancerId,
                    title: 'Pembayaran Diterima di Escrow',
                    message: `Dana untuk pekerjaan berhasil ditahan. Kamu bisa mulai mengerjakan proyek.`,
                  },
                ]
              : []),
          ],
        })
      }
    })
  } catch (err: unknown) {
    // Gagal di dalam TX → 500 (Midtrans akan retry) — jangan return 200 jika DB gagal.
    logger.error('webhook.txFailed', err, { orderId, escrowId: escrow.id })
    return fail('Terjadi kesalahan pada server', 500)
  }

  logger.info('webhook.processed', { orderId, transactionStatus, fraudStatus, escrowStatus, jobStatus })
  return ok('Webhook berhasil diproses', { orderId, paymentStatus: escrowStatus, jobStatus })
}
