"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { EscrowPaymentView } from "@/components/escrow/EscrowPaymentView"

function PaymentContent() {
  const searchParams = useSearchParams()
  const escrowId = searchParams.get("escrowId") || searchParams.get("candidateId") || "3"
  return <EscrowPaymentView escrowId={escrowId} />
}

export default function UmkmPaymentPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-sm text-text-muted">Memuat gerbang pembayaran...</div>}>
      <PaymentContent />
    </Suspense>
  )
}
