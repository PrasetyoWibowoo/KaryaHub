import midtransClient from 'midtrans-client'

const isProduction = process.env.MIDTRANS_IS_PRODUCTION === 'true'

export const snap = new midtransClient.Snap({
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

const TIMEOUT_MS = 8000

export async function createSnapToken(param: Record<string, unknown>): Promise<string> {
    const result = await Promise.race([
        snap.createTransaction(param),
        new Promise<never>((_, reject) =>
            setTimeout(() => reject(new MidtransTimeoutError()), TIMEOUT_MS)
        ),
    ])
    return (result as { token?: string }).token ?? ''
}

export async function cancelTransaction(orderId: string): Promise<void> {
    await snap.transaction.cancel(orderId)
}
