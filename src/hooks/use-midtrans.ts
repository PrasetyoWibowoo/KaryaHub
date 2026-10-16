"use client"

import { useState, useCallback, useEffect } from "react"

declare global {
    interface Window {
        snap?: {
            pay: (
                token: string,
                options: {
                    onSuccess?: (result: MidtransResult) => void
                    onPending?: (result: MidtransResult) => void
                    onError?: (result: MidtransResult) => void
                    onClose?: () => void
                }
            ) => void
        }
    }
}

export interface MidtransResult {
    order_id: string
    transaction_status: string
    fraud_status?: string
    payment_type?: string
    status_code?: string
    status_message?: string
    gross_amount?: string
}

export type PaymentStatus = "idle" | "loading" | "pending" | "success" | "error"

const SNAP_JS_URL =
    process.env.NEXT_PUBLIC_MIDTRANS_ENV === "production"
        ? "https://app.midtrans.com/snap/snap.js"
        : "https://app.sandbox.midtrans.com/snap/snap.js"

export function useMidtrans() {
    const [status, setStatus] = useState<PaymentStatus>("idle")
    const [snapReady, setSnapReady] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [lastResult, setLastResult] = useState<MidtransResult | null>(null)

    // Load Snap.js script
    useEffect(() => {
        if (typeof window === "undefined") return
        if (window.snap) {
            setSnapReady(true)
            return
        }

        const clientKey = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY
        if (!clientKey) {
            console.warn("[useMidtrans] NEXT_PUBLIC_MIDTRANS_CLIENT_KEY is not set")
            return
        }

        const existing = document.querySelector(
            `script[src*="snap.js"]`
        ) as HTMLScriptElement | null

        if (existing) {
            existing.addEventListener("load", () => setSnapReady(true))
            if (window.snap) setSnapReady(true)
            return
        }

        const script = document.createElement("script")
        script.src = SNAP_JS_URL
        script.setAttribute("data-client-key", clientKey)
        script.async = true
        script.onload = () => setSnapReady(true)
        script.onerror = () =>
            setError("Failed to load Midtrans payment gateway")
        document.head.appendChild(script)
    }, [])

    /**
     * Request a Snap token from the backend and open the Midtrans popup.
     */
    const charge = useCallback(
        async (jobId: string): Promise<MidtransResult | null> => {
            setStatus("loading")
            setError(null)
            setLastResult(null)

            try {
                // 1. Request snap token from our API
                const res = await fetch("/api/escrow/charge", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ jobId }),
                })

                const data = await res.json()

                if (!res.ok) {
                    throw new Error(data.message || "Failed to create payment")
                }

                const snapToken: string = data.data?.snapToken
                if (!snapToken) {
                    throw new Error("No snap token received")
                }

                // 2. Open Midtrans Snap popup
                if (!window.snap) {
                    throw new Error("Midtrans Snap is not loaded")
                }

                return new Promise<MidtransResult | null>((resolve) => {
                    window.snap!.pay(snapToken, {
                        onSuccess: (result) => {
                            setStatus("success")
                            setLastResult(result)
                            resolve(result)
                        },
                        onPending: (result) => {
                            setStatus("pending")
                            setLastResult(result)
                            resolve(result)
                        },
                        onError: (result) => {
                            setStatus("error")
                            setError(result.status_message || "Payment failed")
                            setLastResult(result)
                            resolve(null)
                        },
                        onClose: () => {
                            setStatus("idle")
                            resolve(null)
                        },
                    })
                })
            } catch (err) {
                const message =
                    err instanceof Error ? err.message : "Payment failed"
                setStatus("error")
                setError(message)
                return null
            }
        },
        []
    )

    /**
     * Release escrowed funds (employer action).
     */
    const release = useCallback(async (escrowId: string) => {
        setStatus("loading")
        setError(null)

        try {
            const res = await fetch("/api/escrow/release", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ escrowId }),
            })

            const data = await res.json()

            if (!res.ok) {
                throw new Error(data.message || "Failed to release escrow")
            }

            setStatus("success")
            return data.data
        } catch (err) {
            const message =
                err instanceof Error ? err.message : "Release failed"
            setStatus("error")
            setError(message)
            return null
        }
    }, [])

    const reset = useCallback(() => {
        setStatus("idle")
        setError(null)
        setLastResult(null)
    }, [])

    return {
        status,
        snapReady,
        error,
        lastResult,
        charge,
        release,
        reset,
    }
}
