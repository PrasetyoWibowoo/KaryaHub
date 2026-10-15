"use client"

import { use } from "react"
import { EscrowPaymentView } from "@/components/escrow/EscrowPaymentView"

export default function EscrowPaymentDynamicPage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const escrowId = use(params).id || "3"

  return <EscrowPaymentView escrowId={escrowId} />
}
