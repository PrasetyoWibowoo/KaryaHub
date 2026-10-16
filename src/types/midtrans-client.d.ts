declare module 'midtrans-client' {
    interface SnapConfig {
        isProduction: boolean
        serverKey: string
        clientKey: string
    }

    interface Transaction {
        status: (orderId: string) => Promise<Record<string, unknown>>
        cancel: (orderId: string) => Promise<Record<string, unknown>>
    }

    class Snap {
        constructor(config: SnapConfig)
        transaction: Transaction
        createTransaction(param: Record<string, unknown>): Promise<{ token: string; redirect_url: string }>
    }

    export { Snap }
    export default { Snap }
}
