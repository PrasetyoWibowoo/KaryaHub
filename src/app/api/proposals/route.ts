import { NextRequest } from "next/server"
import { prisma } from "@/lib/prisma"
import { ok, fail } from "@/lib/api-response"
import { requireAuth } from "@/lib/auth-helpers"
import { createProposalSchema, proposalQuerySchema } from "@/lib/validators/proposal"
import { logger } from "@/lib/logger"

export async function GET(request: NextRequest) {
  try {
    const { error, session } = await requireAuth()
    if (error) return error

    const url = new URL(request.url)
    const raw = {
      page: url.searchParams.get("page") ?? "1",
      limit: url.searchParams.get("limit") ?? "10",
      jobId: url.searchParams.get("jobId") ?? undefined,
      status: url.searchParams.get("status") ?? undefined,
    }

    const parsed = proposalQuerySchema.safeParse(raw)
    if (!parsed.success) {
      return fail("Invalid query params", 400, parsed.error.flatten())
    }

    const { page, limit, jobId, status } = parsed.data
    const skip = (page - 1) * limit
    const userId = session!.user.id

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: any = {
      OR: [
        { freelancerId: userId },
        { jobs: { employerId: userId } },
      ],
    }

    if (jobId) where.jobId = jobId
    if (status) where.status = status

    const [proposals, total] = await Promise.all([
      prisma.proposals.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          users: {
            select: {
              id: true,
              fullName: true,
              email: true,
              profiles: { select: { avatarUrl: true } },
            },
          },
          jobs: {
            select: {
              id: true,
              title: true,
              budget: true,
              status: true,
              employerId: true,
              users: { select: { id: true, fullName: true } },
            },
          },
        },
      }),
      prisma.proposals.count({ where }),
    ])

    return ok({
      proposals: proposals.map((p) => ({
        id: p.id,
        jobId: p.jobId,
        freelancerId: p.freelancerId,
        coverLetter: p.coverLetter,
        bidAmount: Number(p.bidAmount),
        estimatedDays: p.estimatedDays,
        status: p.status,
        createdAt: p.createdAt,
        freelancer: p.users,
        job: {
          id: p.jobs.id,
          title: p.jobs.title,
          budget: Number(p.jobs.budget),
          status: p.jobs.status,
          employer: p.jobs.users,
        },
      })),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (err) {
    logger.error("GET /api/proposals failed", err)
    return fail("Internal server error", 500)
  }
}

export async function POST(request: NextRequest) {
  try {
    const { error, session } = await requireAuth()
    if (error) return error

    const body = await request.json()
    const parsed = createProposalSchema.safeParse(body)
    if (!parsed.success) {
      return fail("Validation failed", 400, parsed.error.flatten())
    }

    const { jobId, coverLetter, bidAmount, estimatedDays } = parsed.data
    const freelancerId = session!.user.id

    // Check job exists and is OPEN
    const job = await prisma.jobs.findUnique({ where: { id: jobId } })
    if (!job) return fail("Job not found", 404)
    if (job.status !== "OPEN") return fail("Job is no longer accepting proposals", 422)
    if (job.employerId === freelancerId) return fail("Cannot apply to your own job", 422)

    // Check for existing proposal
    const existing = await prisma.proposals.findFirst({
      where: { jobId, freelancerId },
    })
    if (existing) return fail("You have already submitted a proposal for this job", 409)

    const proposal = await prisma.proposals.create({
      data: {
        coverLetter,
        bidAmount,
        estimatedDays,
        jobs: { connect: { id: jobId } },
        users: { connect: { id: freelancerId } },
      },
      include: {
        users: { select: { id: true, fullName: true } },
        jobs: { select: { id: true, title: true, employerId: true } },
      },
    })

    // Notify job owner
    await prisma.notifications.create({
      data: {
        title: "New Proposal Received",
        message: `${proposal.users.fullName} submitted a proposal for "${proposal.jobs.title}"`,
        users: { connect: { id: proposal.jobs.employerId } },
      },
    })

    logger.info("Proposal created", { proposalId: proposal.id, jobId, freelancerId })

    return ok(
      {
        id: proposal.id,
        jobId: proposal.jobId,
        coverLetter: proposal.coverLetter,
        bidAmount: Number(proposal.bidAmount),
        estimatedDays: proposal.estimatedDays,
        status: proposal.status,
        createdAt: proposal.createdAt,
        freelancer: proposal.users,
        job: proposal.jobs,
      },
      201,
    )
  } catch (err) {
    logger.error("POST /api/proposals failed", err)
    return fail("Internal server error", 500)
  }
}
