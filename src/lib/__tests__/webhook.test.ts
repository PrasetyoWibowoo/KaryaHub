import { describe, it, expect, beforeAll } from 'vitest'
import { createHash } from 'node:crypto'
import { prisma } from '@/lib/prisma'
import { Prisma } from '@/generated/prisma'

function sign(orderId: string, statusCode: string, grossAmount: string) {
  const raw = `${orderId}${statusCode}${grossAmount}${process.env.MIDTRANS_SERVER_KEY ?? ''}`
  return createHash('sha512').update(raw).digest('hex')
}

function makeBody(overrides: Record<string, unknown> = {}) {
  const orderId = (overrides.order_id as string) ?? 'FAKE-ORDER'
  const statusCode = (overrides.status_code as string) ?? '200'
  const grossAmount = (overrides.gross_amount as string) ?? '100000'
  const signature = sign(orderId, statusCode, grossAmount)

  return {
    order_id: orderId,
    status_code: statusCode,
    gross_amount: grossAmount,
    signature_key: (overrides.signature_key as string) ?? signature,
    transaction_status: 'settlement' as string,
    transaction_id: 'txn-fake',
    ...overrides,
    // ensure override signature_key wins if provided
    ...(overrides.signature_key !== undefined ? { signature_key: overrides.signature_key as string } : {}),
  }
}

async function callWebhook(body: unknown, headers: Record<string, string> = {}) {
  const req = new Request('http://test/api/webhooks/midtrans', {
    method: 'POST',
    headers: { 'content-type': 'application/json', ...headers },
    body: JSON.stringify(body),
  })

  const { POST } = await import('@/app/api/webhooks/midtrans/route')
  return POST(req) as unknown as Response
}

// ponytail: webhook route is a plain handler; test bypasses tunnel/process.
// upgrade path: midtrans simulator + cloudflared untuk e2e bila perlu.
async function seedJobAndEscrow(opts: { status?: 'PENDING' | 'HELD_IN_ESCROW' } = {}) {
  const employer = await prisma.user.create({
    data: {
      email: `webhook-employer-${Date.now()}-${Math.random().toString(36).slice(2, 6)}@test.com`,
      passwordHash: 'x',
      fullName: 'Employer Webhook',
      role: 'UMKM',
    },
  })

  const job = await prisma.job.create({
    data: {
      employerId: employer.id,
      title: 'Job Webhook Test',
      description: 'Desc minimal dua puluh karakter terpenuhi',
      category: 'General',
      budget: new Prisma.Decimal('100000'),
      estimatedHours: 1,
      status: 'OPEN',
    },
  })

  const orderId = `ESCROW-${job.id.slice(0, 8)}-${Math.floor(Date.now() / 1000)}`

  const escrow = await prisma.escrowTransaction.create({
    data: {
      jobId: job.id,
      employerId: employer.id,
      amount: new Prisma.Decimal('100000'),
      midtransOrderId: orderId,
      midtransSnapToken: 'tok-test',
      paymentStatus: opts.status ?? 'PENDING',
    },
  })

  return { employer, job, escrow, orderId }
}

describe('webhooks/midtrans — 7 skenario wajib + 5 tambahan', () => {
  const toCleanup: string[] = []

  beforeAll(async () => {
    process.env.MIDTRANS_SERVER_KEY = process.env.MIDTRANS_SERVER_KEY ?? 'SB-Mid-server-test'
  })

  // 1. settlement → HELD_IN_ESCROW + IN_PROGRESS
  it('settlement valid → 200 HELD_IN_ESCROW + IN_PROGRESS', async () => {
    const seed = await seedJobAndEscrow()
    toCleanup.push(seed.job.id, seed.escrow.id, seed.employer.id)

    const res = await callWebhook({
      order_id: seed.orderId,
      status_code: '200',
      gross_amount: '100000',
      transaction_status: 'settlement',
      signature_key: sign(seed.orderId, '200', '100000'),
    })

    expect(res.status).toBe(200)

    const fresh = await prisma.escrowTransaction.findUnique({
      where: { id: seed.escrow.id },
      select: { paymentStatus: true, job: { select: { status: true } } },
    })
    expect(fresh?.paymentStatus).toBe('HELD_IN_ESCROW')
    expect(fresh?.job.status).toBe('IN_PROGRESS')
  })

  // 2. signature invalid → 403
  it('signature invalid → 403', async () => {
    const seed = await seedJobAndEscrow()
    toCleanup.push(seed.job.id, seed.escrow.id, seed.employer.id)

    const res = await callWebhook({
      order_id: seed.orderId,
      status_code: '200',
      gross_amount: '100000',
      signature_key: 'bad-signature',
      transaction_status: 'settlement',
    })

    expect(res.status).toBe(403)
  })

  // 3. amount mismatch → 400
  it('amount mismatch → 400', async () => {
    const seed = await seedJobAndEscrow()
    toCleanup.push(seed.job.id, seed.escrow.id, seed.employer.id)

    const res = await callWebhook({
      order_id: seed.orderId,
      status_code: '200',
      gross_amount: '999999',
      signature_key: sign(seed.orderId, '200', '999999'),
      transaction_status: 'settlement',
    })

    expect(res.status).toBe(400)
  })

  // 4. replay idempoten → 200
  it('replay saat sudah HELD → 200 idempoten', async () => {
    const seed = await seedJobAndEscrow()
    toCleanup.push(seed.job.id, seed.escrow.id, seed.employer.id)

    const ok1 = await callWebhook({
      order_id: seed.orderId,
      status_code: '200',
      gross_amount: '100000',
      signature_key: sign(seed.orderId, '200', '100000'),
      transaction_status: 'settlement',
    })
    expect(ok1.status).toBe(200)

    const ok2 = await callWebhook({
      order_id: seed.orderId,
      status_code: '200',
      gross_amount: '100000',
      signature_key: sign(seed.orderId, '200', '100000'),
      transaction_status: 'settlement',
    })
    expect(ok2.status).toBe(200)
  })

  // 5. expire → EXPIRED
  it('expire → 200 EXPIRED', async () => {
    const seed = await seedJobAndEscrow()
    toCleanup.push(seed.job.id, seed.escrow.id, seed.employer.id)

    const res = await callWebhook({
      order_id: seed.orderId,
      status_code: '407',
      gross_amount: '100000',
      signature_key: sign(seed.orderId, '407', '100000'),
      transaction_status: 'expire',
    })

    expect(res.status).toBe(200)
    const fresh = await prisma.escrowTransaction.findUnique({ where: { id: seed.escrow.id }, select: { paymentStatus: true } })
    expect(fresh?.paymentStatus).toBe('EXPIRED')
  })

  // 6. deny → FAILED
  it('deny → 200 FAILED', async () => {
    const seed = await seedJobAndEscrow()
    toCleanup.push(seed.job.id, seed.escrow.id, seed.employer.id)

    const res = await callWebhook({
      order_id: seed.orderId,
      status_code: '202',
      gross_amount: '100000',
      signature_key: sign(seed.orderId, '202', '100000'),
      transaction_status: 'deny',
    })

    expect(res.status).toBe(200)
    const fresh = await prisma.escrowTransaction.findUnique({ where: { id: seed.escrow.id }, select: { paymentStatus: true } })
    expect(fresh?.paymentStatus).toBe('FAILED')
  })

  // 6b. cancel → FAILED
  it('cancel → 200 FAILED', async () => {
    const seed = await seedJobAndEscrow()
    toCleanup.push(seed.job.id, seed.escrow.id, seed.employer.id)

    const res = await callWebhook({
      order_id: seed.orderId,
      status_code: '202',
      gross_amount: '100000',
      signature_key: sign(seed.orderId, '202', '100000'),
      transaction_status: 'cancel',
    })

    expect(res.status).toBe(200)
    const fresh = await prisma.escrowTransaction.findUnique({ where: { id: seed.escrow.id }, select: { paymentStatus: true } })
    expect(fresh?.paymentStatus).toBe('FAILED')
  })

  // 7. order_id tidak ada → 404
  it('order_id tidak ada → 404', async () => {
    const res = await callWebhook({
      order_id: 'ORDER-TIDAK-ADA-1234567890',
      status_code: '200',
      gross_amount: '100000',
      signature_key: sign('ORDER-TIDAK-ADA-1234567890', '200', '100000'),
      transaction_status: 'settlement',
    })

    expect(res.status).toBe(404)
  })

  // 8. capture+accept → HELD_IN_ESCROW
  it('capture fraud accept → 200 HELD_IN_ESCROW', async () => {
    const seed = await seedJobAndEscrow()
    toCleanup.push(seed.job.id, seed.escrow.id, seed.employer.id)

    const res = await callWebhook({
      order_id: seed.orderId,
      status_code: '200',
      gross_amount: '100000',
      signature_key: sign(seed.orderId, '200', '100000'),
      transaction_status: 'capture',
      fraud_status: 'accept',
    })

    expect(res.status).toBe(200)
    const fresh = await prisma.escrowTransaction.findUnique({ where: { id: seed.escrow.id }, select: { paymentStatus: true } })
    expect(fresh?.paymentStatus).toBe('HELD_IN_ESCROW')
  })

  // 8b. capture+accept lalu settlement (no-op)
  it('capture+accept lalu settlement → 200 no-op (idempoten)', async () => {
    const seed = await seedJobAndEscrow()
    toCleanup.push(seed.job.id, seed.escrow.id, seed.employer.id)

    const r1 = await callWebhook({
      order_id: seed.orderId,
      status_code: '200',
      gross_amount: '100000',
      signature_key: sign(seed.orderId, '200', '100000'),
      transaction_status: 'capture',
      fraud_status: 'accept',
    })
    expect(r1.status).toBe(200)

    const r2 = await callWebhook({
      order_id: seed.orderId,
      status_code: '200',
      gross_amount: '100000',
      signature_key: sign(seed.orderId, '200', '100000'),
      transaction_status: 'settlement',
    })
    expect(r2.status).toBe(200)
    const fresh = await prisma.escrowTransaction.findUnique({ where: { id: seed.escrow.id }, select: { paymentStatus: true } })
    expect(fresh?.paymentStatus).toBe('HELD_IN_ESCROW')
  })

  // 9. capture+challenge → tetap PENDING
  it('capture challenge → 200 tetap PENDING', async () => {
    const seed = await seedJobAndEscrow()
    toCleanup.push(seed.job.id, seed.escrow.id, seed.employer.id)

    const res = await callWebhook({
      order_id: seed.orderId,
      status_code: '200',
      gross_amount: '100000',
      signature_key: sign(seed.orderId, '200', '100000'),
      transaction_status: 'capture',
      fraud_status: 'challenge',
    })

    expect(res.status).toBe(200)
    const fresh = await prisma.escrowTransaction.findUnique({ where: { id: seed.escrow.id }, select: { paymentStatus: true } })
    expect(fresh?.paymentStatus).toBe('PENDING')
  })

  // 9b. capture+deny → FAILED
  it('capture fraud deny → 200 FAILED', async () => {
    const seed = await seedJobAndEscrow()
    toCleanup.push(seed.job.id, seed.escrow.id, seed.employer.id)

    const res = await callWebhook({
      order_id: seed.orderId,
      status_code: '200',
      gross_amount: '100000',
      signature_key: sign(seed.orderId, '200', '100000'),
      transaction_status: 'capture',
      fraud_status: 'deny',
    })

    expect(res.status).toBe(200)
    const fresh = await prisma.escrowTransaction.findUnique({ where: { id: seed.escrow.id }, select: { paymentStatus: true } })
    expect(fresh?.paymentStatus).toBe('FAILED')
  })

  // 9c. capture fraud kosong → tetap PENDING (treated as challenge)
  it('capture fraud kosong → 200 tetap PENDING', async () => {
    const seed = await seedJobAndEscrow()
    toCleanup.push(seed.job.id, seed.escrow.id, seed.employer.id)

    const res = await callWebhook({
      order_id: seed.orderId,
      status_code: '200',
      gross_amount: '100000',
      signature_key: sign(seed.orderId, '200', '100000'),
      transaction_status: 'capture',
    })

    expect(res.status).toBe(200)
    const fresh = await prisma.escrowTransaction.findUnique({ where: { id: seed.escrow.id }, select: { paymentStatus: true } })
    expect(fresh?.paymentStatus).toBe('PENDING')
  })

  // 10. pending setelah HELD → 200 tanpa mutasi
  it('pending setelah HELD → 200 tanpa mutasi', async () => {
    const seed = await seedJobAndEscrow()
    toCleanup.push(seed.job.id, seed.escrow.id, seed.employer.id)

    const ok = await callWebhook({
      order_id: seed.orderId,
      status_code: '200',
      gross_amount: '100000',
      signature_key: sign(seed.orderId, '200', '100000'),
      transaction_status: 'settlement',
    })
    expect(ok.status).toBe(200)

    const res = await callWebhook({
      order_id: seed.orderId,
      status_code: '201',
      gross_amount: '100000',
      signature_key: sign(seed.orderId, '201', '100000'),
      transaction_status: 'pending',
    })
    expect(res.status).toBe(200)
    const fresh = await prisma.escrowTransaction.findUnique({ where: { id: seed.escrow.id }, select: { paymentStatus: true } })
    expect(fresh?.paymentStatus).toBe('HELD_IN_ESCROW')
  })

  // 11. authorize setelah HELD → 200 tanpa mutasi
  it('authorize setelah HELD → 200 tanpa mutasi', async () => {
    const seed = await seedJobAndEscrow()
    toCleanup.push(seed.job.id, seed.escrow.id, seed.employer.id)

    const ok = await callWebhook({
      order_id: seed.orderId,
      status_code: '200',
      gross_amount: '100000',
      signature_key: sign(seed.orderId, '200', '100000'),
      transaction_status: 'settlement',
    })
    expect(ok.status).toBe(200)

    const res = await callWebhook({
      order_id: seed.orderId,
      status_code: '200',
      gross_amount: '100000',
      signature_key: sign(seed.orderId, '200', '100000'),
      transaction_status: 'authorize',
    })
    expect(res.status).toBe(200)
    const fresh = await prisma.escrowTransaction.findUnique({ where: { id: seed.escrow.id }, select: { paymentStatus: true } })
    expect(fresh?.paymentStatus).toBe('HELD_IN_ESCROW')
  })

  // 12. cancel saat HELD → 200 tanpa mutasi (REFUNDED tidak pernah dari webhook)
  it('cancel saat HELD → 200 tanpa mutasi', async () => {
    const seed = await seedJobAndEscrow()
    toCleanup.push(seed.job.id, seed.escrow.id, seed.employer.id)

    const ok = await callWebhook({
      order_id: seed.orderId,
      status_code: '200',
      gross_amount: '100000',
      signature_key: sign(seed.orderId, '200', '100000'),
      transaction_status: 'settlement',
    })
    expect(ok.status).toBe(200)

    const res = await callWebhook({
      order_id: seed.orderId,
      status_code: '202',
      gross_amount: '100000',
      signature_key: sign(seed.orderId, '202', '100000'),
      transaction_status: 'cancel',
    })
    expect(res.status).toBe(200)
    const fresh = await prisma.escrowTransaction.findUnique({ where: { id: seed.escrow.id }, select: { paymentStatus: true } })
    expect(fresh?.paymentStatus).toBe('HELD_IN_ESCROW')
  })

  // 13. refund/partial_refund/chargeback saat HELD → 200 tanpa mutasi
  it('partial_refund saat HELD → 200 tanpa mutasi', async () => {
    const seed = await seedJobAndEscrow()
    toCleanup.push(seed.job.id, seed.escrow.id, seed.employer.id)

    const ok = await callWebhook({
      order_id: seed.orderId,
      status_code: '200',
      gross_amount: '100000',
      signature_key: sign(seed.orderId, '200', '100000'),
      transaction_status: 'settlement',
    })
    expect(ok.status).toBe(200)

    const res = await callWebhook({
      order_id: seed.orderId,
      status_code: '200',
      gross_amount: '100000',
      signature_key: sign(seed.orderId, '200', '100000'),
      transaction_status: 'partial_refund',
    })
    expect(res.status).toBe(200)
    const fresh = await prisma.escrowTransaction.findUnique({ where: { id: seed.escrow.id }, select: { paymentStatus: true } })
    expect(fresh?.paymentStatus).toBe('HELD_IN_ESCROW')
  })
})
