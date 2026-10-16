import { NextRequest } from "next/server"
import { prisma } from "@/lib/prisma"
import { ok, fail } from "@/lib/api-response"
import { requireRole } from "@/lib/auth-helpers"
import { chargeSchema } from "@/lib/validators/escrow"
import { createSnapToken } from "@/lib/midtrans"
import { generateOrderId } from "@/lib/utils"
import { logger } from "@/lib/logger"

export async function POST(request: NextRequest) {
  try {
    const { error, session } = await requireRole(["UMKM"])
    if (error) return error

    const body = await request.json()
    const parsed = chargeSchema.safeParse(body)
    if (!parsed.success) {
      return fail("Validation failed", 400, parsed.error.flatten())
    }

    const { jobId } = parsed.data

    // Load job with accepted proposal
    const job = await prisma.jobs.findUnique({
      where: { id: jobId },
      include: {
        proposals: {
          where: { status: "ACCEPTED" },
          include: { users: { select: { id: true, fullName: true, email: true } } },
        },
      },
    })

    if (!job) return fail("Job not found", 404)
    if (job.employerId !== session.user.id) return fail("Forbidden", 403)

    // Check for accepted proposal
    const acceptedProposal = job.proposals[0]
    if (!acceptedProposal) {
      return fail("No accepted proposal found for this job", 422)
    }

    // Check if escrow already exists
    const existingEscrow = await prisma.escrow_transactions.findUnique({
      where: { jobId },
    })
    if (existingEscrow && existingEscrow.paymentStatus !== "PENDING") {
      return fail("Escrow already processed for this job", 422)
    }

    const orderId = generateOrderId(jobId)
    const amount = Number(acceptedProposal.bidAmount)

    // Create Midtrans snap token
    let snapToken: string
    try {
      snapToken = await createSnapToken({
        transaction_details: {
          order_id: orderId,
          gross_amount: amount,
        },
        customer_details: {
          email: session.user.email,
          first_name: session.user.name,
        },
        item_details: [
          {
            id: jobId,
            price: amount,
            quantity: 1,
            name: `Escrow: ${job.title.slice(0, 50)}`,
          },
        ],
      })
    } catch (midtransErr) {
      logger.error("Midtrans snap token failed", midtransErr)
      return fail("Payment gateway error, please try again", 502)
    }

    // Create or update escrow record
    const escrow = existingEscrow
      ? await prisma.escrow_transactions.update({
        where: { jobId },
        data: {
          midtransOrderId: orderId,
          midtransSnapToken: snapToken,
          amount,
          users_escrow_transactions_freelancerIdTousers: {
            connect: { id: acceptedProposal.freelancerId },
          },
        },
      })
      : await prisma.escrow_transactions.create({
        data: {
          midtransOrderId: orderId,
          midtransSnapToken: snapToken,
          amount,
          jobs: { connect: { id: jobId } },
          users_escrow_transactions_employerIdTousers: {
            connect: { id: session.user.id },
          },
          users_escrow_transactions_freelancerIdTousers: {
            connect: { id: acceptedProposal.freelancerId },
          },
        },
      })

    logger.info("Escrow charge initiated", {
      escrowId: escrow.id,
      jobId,
      orderId,
    })

    return ok({
      escrowId: escrow.id,
      snapToken,
      orderId,
      amount,
    }, 201)
  } catch (err) {
    logger.error("POST /api/escrow/charge failed", err)
    return fail("Internal server error", 500)
  }
}
