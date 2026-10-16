import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { logger } from "@/lib/logger"
import crypto from "crypto"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const {
      order_id,
      status_code,
      gross_amount,
      signature_key,
      transaction_status,
      fraud_status,
    } = body

    // Verify signature
    const serverKey = process.env.MIDTRANS_SERVER_KEY ?? ""
    const expectedSignature = crypto
      .createHash("sha512")
      .update(`${order_id}${status_code}${gross_amount}${serverKey}`)
      .digest("hex")

    if (signature_key !== expectedSignature) {
      logger.warn("Midtrans webhook: invalid signature", { order_id })
      return NextResponse.json({ error: "Invalid signature" }, { status: 403 })
    }

    // Map Midtrans status to our EscrowStatus
    let paymentStatus: "PENDING" | "HELD_IN_ESCROW" | "REFUNDED"
    if (transaction_status === "capture" || transaction_status === "settlement") {
      if (fraud_status === "accept" || !fraud_status) {
        paymentStatus = "HELD_IN_ESCROW"
      } else {
        paymentStatus = "PENDING"
      }
    } else if (
      transaction_status === "cancel" ||
      transaction_status === "deny" ||
      transaction_status === "expire"
    ) {
      paymentStatus = "REFUNDED"
    } else if (transaction_status === "pending") {
      paymentStatus = "PENDING"
    } else {
      logger.warn("Midtrans webhook: unknown status", { transaction_status, order_id })
      return NextResponse.json({ message: "Unknown status" }, { status: 200 })
    }

    // Find escrow by midtransOrderId
    const escrow = await prisma.escrow_transactions.findUnique({
      where: { midtransOrderId: order_id },
      include: {
        jobs: { select: { id: true, title: true } },
      },
    })

    if (!escrow) {
      logger.warn("Midtrans webhook: escrow not found", { order_id })
      return NextResponse.json({ message: "Order not found" }, { status: 200 })
    }

    // Idempotent: skip if already processed to this status
    if (escrow.paymentStatus === paymentStatus || escrow.paymentStatus === "RELEASED") {
      return NextResponse.json({ message: "Already processed" }, { status: 200 })
    }

    // Update escrow status
    await prisma.escrow_transactions.update({
      where: { id: escrow.id },
      data: { paymentStatus },
    })

    // Notify employer
    if (paymentStatus === "HELD_IN_ESCROW") {
      await prisma.notifications.create({
        data: {
          title: "Payment Secured 🔒",
          message: `Payment of Rp ${Number(escrow.amount).toLocaleString("id-ID")} for "${escrow.jobs.title}" is held in escrow.`,
          users: { connect: { id: escrow.employerId } },
        },
      })

      // Notify freelancer
      if (escrow.freelancerId) {
        await prisma.notifications.create({
          data: {
            title: "Work Can Begin! 🚀",
            message: `Escrow payment for "${escrow.jobs.title}" has been secured. You can start working.`,
            users: { connect: { id: escrow.freelancerId } },
          },
        })
      }
    }

    logger.info("Midtrans webhook processed", {
      order_id,
      paymentStatus,
      escrowId: escrow.id,
    })

    return NextResponse.json({ message: "OK" }, { status: 200 })
  } catch (err) {
    logger.error("POST /api/webhooks/midtrans failed", err)
    return NextResponse.json({ error: "Internal error" }, { status: 500 })
  }
}
