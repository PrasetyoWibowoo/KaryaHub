import { NextRequest } from "next/server"
import { prisma } from "@/lib/prisma"
import { ok, fail } from "@/lib/api-response"
import { requireAuth } from "@/lib/auth-helpers"
import { decisionSchema } from "@/lib/validators/proposal"
import { logger } from "@/lib/logger"

type RouteContext = { params: Promise<{ id: string }> }

export async function GET(
  _request: NextRequest,
  context: RouteContext,
) {
  try {
    const { id } = await context.params

    const proposal = await prisma.proposals.findUnique({
      where: { id },
      include: {
        users: {
          select: {
            id: true,
            fullName: true,
            email: true,
            profiles: { select: { avatarUrl: true, bio: true, portfolioUrl: true } },
            user_skills: { include: { skills: true } },
          },
        },
        jobs: {
          select: { id: true, title: true, budget: true, status: true, employerId: true },
        },
      },
    })

    if (!proposal) return fail("Proposal not found", 404)

    return ok({
      id: proposal.id,
      jobId: proposal.jobId,
      coverLetter: proposal.coverLetter,
      bidAmount: Number(proposal.bidAmount),
      estimatedDays: proposal.estimatedDays,
      status: proposal.status,
      createdAt: proposal.createdAt,
      freelancer: {
        id: proposal.users.id,
        fullName: proposal.users.fullName,
        email: proposal.users.email,
        profiles: proposal.users.profiles,
        skills: proposal.users.user_skills.map((us) => us.skills),
      },
      job: {
        id: proposal.jobs.id,
        title: proposal.jobs.title,
        budget: Number(proposal.jobs.budget),
        status: proposal.jobs.status,
        employerId: proposal.jobs.employerId,
      },
    })
  } catch (err) {
    logger.error("GET /api/proposals/[id] failed", err)
    return fail("Internal server error", 500)
  }
}

export async function PATCH(
  request: NextRequest,
  context: RouteContext,
) {
  try {
    const { error, session } = await requireAuth()
    if (error) return error

    const { id } = await context.params

    const body = await request.json()
    const parsed = decisionSchema.safeParse(body)
    if (!parsed.success) {
      return fail("Validation failed", 400, parsed.error.flatten())
    }

    const { decision } = parsed.data

    // Load proposal with job
    const proposal = await prisma.proposals.findUnique({
      where: { id },
      include: {
        jobs: { select: { id: true, title: true, employerId: true } },
        users: { select: { id: true, fullName: true } },
      },
    })

    if (!proposal) return fail("Proposal not found", 404)

    // Only the job employer can accept/reject
    if (proposal.jobs.employerId !== session!.user.id) {
      return fail("Forbidden", 403)
    }

    if (proposal.status !== "PENDING") {
      return fail("Proposal has already been decided", 422)
    }

    const newStatus = decision === "accept" ? "ACCEPTED" as const : "REJECTED" as const

    const updated = await prisma.proposals.update({
      where: { id },
      data: { status: newStatus },
    })

    // If accepted, update job status to IN_PROGRESS and reject other proposals
    if (decision === "accept") {
      await prisma.jobs.update({
        where: { id: proposal.jobId },
        data: { status: "IN_PROGRESS" },
      })

      // Reject all other pending proposals for this job
      await prisma.proposals.updateMany({
        where: {
          jobId: proposal.jobId,
          id: { not: id },
          status: "PENDING",
        },
        data: { status: "REJECTED" },
      })
    }

    // Notify the freelancer
    await prisma.notifications.create({
      data: {
        title: decision === "accept" ? "Proposal Accepted! 🎉" : "Proposal Update",
        message:
          decision === "accept"
            ? `Your proposal for "${proposal.jobs.title}" has been accepted!`
            : `Your proposal for "${proposal.jobs.title}" was not selected.`,
        users: { connect: { id: proposal.freelancerId } },
      },
    })

    logger.info("Proposal decision", { proposalId: id, decision })

    return ok({
      id: updated.id,
      status: updated.status,
      bidAmount: Number(updated.bidAmount),
    })
  } catch (err) {
    logger.error("PATCH /api/proposals/[id] failed", err)
    return fail("Internal server error", 500)
  }
}
