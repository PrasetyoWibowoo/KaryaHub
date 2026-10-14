declare module 'midtrans-client' {
  interface SnapResponse {
    token?: string
    redirect_url?: string
  }

  interface SnapTransactionManager {
    status(orderId: string): Promise<Record<string, unknown>>
    cancel(orderId: string): Promise<Record<string, unknown>>
  }

  class Snap {
    constructor(options: {
      isProduction?: boolean
      serverKey: string
      clientKey?: string
    })
    createTransaction(parameter: Record<string, unknown>): Promise<SnapResponse>
    transaction: SnapTransactionManager
  }

  export { Snap, SnapResponse }
}
