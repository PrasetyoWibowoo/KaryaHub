import { NextRequest } from "next/server"
import { prisma } from "@/lib/prisma"
import { ok, fail } from "@/lib/api-response"
import { requireRole } from "@/lib/auth-helpers"
import { releaseSchema } from "@/lib/validators/escrow"
import { logger } from "@/lib/logger"

export async function POST(request: NextRequest) {
  try {
    const { error, session } = await requireRole(["UMKM"])
    if (error) return error

    const body = await request.json()
    const parsed = releaseSchema.safeParse(body)
    if (!parsed.success) {
      return fail("Validation failed", 400, parsed.error.flatten())
    }

    const { escrowId } = parsed.data

    const escrow = await prisma.escrow_transactions.findUnique({
      where: { id: escrowId },
      include: {
        jobs: { select: { id: true, title: true } },
      },
    })

    if (!escrow) return fail("Escrow not found", 404)
    if (escrow.employerId !== session.user.id) return fail("Forbidden", 403)

    if (escrow.paymentStatus !== "HELD_IN_ESCROW") {
      return fail("Escrow is not in HELD_IN_ESCROW status", 422)
    }

    // Release funds
    const updated = await prisma.escrow_transactions.update({
      where: { id: escrowId },
      data: { paymentStatus: "RELEASED" },
    })

    // Update job to COMPLETED
    await prisma.jobs.update({
      where: { id: escrow.jobId },
      data: { status: "COMPLETED" },
    })

    // Notify both parties
    if (escrow.freelancerId) {
      await prisma.notifications.create({
        data: {
          title: "Payment Released! 💰",
          message: `Payment of Rp ${Number(escrow.amount).toLocaleString("id-ID")} for "${escrow.jobs.title}" has been released.`,
          users: { connect: { id: escrow.freelancerId } },
        },
      })
    }

    await prisma.notifications.create({
      data: {
        title: "Payment Released",
        message: `You released Rp ${Number(escrow.amount).toLocaleString("id-ID")} for "${escrow.jobs.title}".`,
        users: { connect: { id: escrow.employerId } },
      },
    })

    logger.info("Escrow released", { escrowId, jobId: escrow.jobId })

    return ok({
      escrowId: updated.id,
      status: updated.paymentStatus,
      amount: Number(updated.amount),
    })
  } catch (err) {
    logger.error("POST /api/escrow/release failed", err)
    return fail("Internal server error", 500)
  }
}
