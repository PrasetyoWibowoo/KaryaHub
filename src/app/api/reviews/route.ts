import { NextRequest } from "next/server"
import { prisma } from "@/lib/prisma"
import { ok, fail } from "@/lib/api-response"
import { requireAuth } from "@/lib/auth-helpers"
import { logger } from "@/lib/logger"
import { z } from "zod"

const createReviewSchema = z.object({
  jobId: z.string().min(1),
  revieweeId: z.string().min(1),
  rating: z.number().int().min(1).max(5),
  comment: z.string().max(1000).optional(),
})

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const userId = url.searchParams.get("userId")
    const jobId = url.searchParams.get("jobId")

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: any = {}
    if (userId) where.revieweeId = userId
    if (jobId) where.jobId = jobId

    const reviews = await prisma.reviews.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: {
        users_reviews_reviewerIdTousers: {
          select: { id: true, fullName: true, profiles: { select: { avatarUrl: true } } },
        },
        users_reviews_revieweeIdTousers: {
          select: { id: true, fullName: true },
        },
        jobs: {
          select: { id: true, title: true },
        },
      },
    })

    return ok({
      reviews: reviews.map((r) => ({
        id: r.id,
        jobId: r.jobId,
        rating: r.rating,
        comment: r.comment,
        createdAt: r.createdAt,
        reviewer: r.users_reviews_reviewerIdTousers,
        reviewee: r.users_reviews_revieweeIdTousers,
        job: r.jobs,
      })),
    })
  } catch (err) {
    logger.error("GET /api/reviews failed", err)
    return fail("Internal server error", 500)
  }
}

export async function POST(request: NextRequest) {
  try {
    const { error, session } = await requireAuth()
    if (error) return error

    const body = await request.json()
    const parsed = createReviewSchema.safeParse(body)
    if (!parsed.success) {
      return fail("Validation failed", 400, parsed.error.flatten())
    }

    const { jobId, revieweeId, rating, comment } = parsed.data
    const reviewerId = session!.user.id

    // Check job exists and is completed
    const job = await prisma.jobs.findUnique({ where: { id: jobId } })
    if (!job) return fail("Job not found", 404)
    if (job.status !== "COMPLETED") return fail("Can only review completed jobs", 422)

    // Check no duplicate review
    const existing = await prisma.reviews.findUnique({ where: { jobId } })
    if (existing) return fail("Review already exists for this job", 409)

    // Only employer or freelancer of this job can review
    if (job.employerId !== reviewerId) {
      return fail("Only the employer can submit a review", 403)
    }

    const review = await prisma.reviews.create({
      data: {
        rating,
        comment,
        jobs: { connect: { id: jobId } },
        users_reviews_reviewerIdTousers: { connect: { id: reviewerId } },
        users_reviews_revieweeIdTousers: { connect: { id: revieweeId } },
      },
    })

    // Notify reviewee
    await prisma.notifications.create({
      data: {
        title: "New Review Received ⭐",
        message: `You received a ${rating}-star review for "${job.title}"`,
        users: { connect: { id: revieweeId } },
      },
    })

    logger.info("Review created", { reviewId: review.id, jobId })

    return ok(
      {
        id: review.id,
        jobId: review.jobId,
        rating: review.rating,
        comment: review.comment,
        createdAt: review.createdAt,
      },
      201,
    )
  } catch (err) {
    logger.error("POST /api/reviews failed", err)
    return fail("Internal server error", 500)
  }
}
