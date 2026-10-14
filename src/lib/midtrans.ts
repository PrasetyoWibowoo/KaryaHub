import { Snap } from 'midtrans-client'

const isProduction = process.env.MIDTRANS_IS_PRODUCTION === 'true'

export const snap = new Snap({
  isProduction,
  serverKey: process.env.MIDTRANS_SERVER_KEY ?? '',
  clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY ?? '',
})

export class MidtransTimeoutError extends Error {
  constructor() {
    super('Midtrans timeout')
    this.name = 'MidtransTimeoutError'
  }
}

// ponytail: SDK tak terima AbortSignal → Promise.race 8s. Request tetap jalan di belakang;
// order_id unik (generateOrderId) menjaga charge ulang aman. Upgrade: pass AbortSignal bila SDK dukung.
const TIMEOUT_MS = 8000

export async function createSnapToken(param: Record<string, unknown>): Promise<string> {
  const result = await Promise.race([
    snap.createTransaction(param),
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new MidtransTimeoutError()), TIMEOUT_MS)
    ),
  ])
  return result.token ?? ''
}

export async function cancelTransaction(orderId: string): Promise<void> {
  await snap.transaction.cancel(orderId)
}
