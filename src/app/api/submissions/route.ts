import { NextRequest } from "next/server"
import { prisma } from "@/lib/prisma"
import { ok, fail } from "@/lib/api-response"
import { requireAuth } from "@/lib/auth-helpers"
import { logger } from "@/lib/logger"
import { z } from "zod"

const createSubmissionSchema = z.object({
  jobId: z.string().min(1),
  submissionUrl: z.string().url("URL submission wajib valid"),
  notes: z.string().max(2000).optional(),
})

export async function GET(request: NextRequest) {
  try {
    const { error, session } = await requireAuth()
    if (error) return error

    const url = new URL(request.url)
    const jobId = url.searchParams.get("jobId")

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: any = {}

    if (jobId) {
      where.jobId = jobId
    } else {
      // Show submissions where user is freelancer or job employer
      where.OR = [
        { freelancerId: session!.user.id },
        { jobs: { employerId: session!.user.id } },
      ]
    }

    const submissions = await prisma.job_submissions.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: {
        users: { select: { id: true, fullName: true } },
        jobs: { select: { id: true, title: true, employerId: true } },
      },
    })

    return ok({
      submissions: submissions.map((s) => ({
        id: s.id,
        jobId: s.jobId,
        submissionUrl: s.submissionUrl,
        notes: s.notes,
        status: s.status,
        createdAt: s.createdAt,
        updatedAt: s.updatedAt,
        freelancer: s.users,
        job: s.jobs,
      })),
    })
  } catch (err) {
    logger.error("GET /api/submissions failed", err)
    return fail("Internal server error", 500)
  }
}

export async function POST(request: NextRequest) {
  try {
    const { error, session } = await requireAuth()
    if (error) return error

    const body = await request.json()
    const parsed = createSubmissionSchema.safeParse(body)
    if (!parsed.success) {
      return fail("Validation failed", 400, parsed.error.flatten())
    }

    const { jobId, submissionUrl, notes } = parsed.data
    const freelancerId = session!.user.id

    // Check job exists and is IN_PROGRESS
    const job = await prisma.jobs.findUnique({ where: { id: jobId } })
    if (!job) return fail("Job not found", 404)
    if (job.status !== "IN_PROGRESS") return fail("Job is not in progress", 422)

    // Verify the user is the accepted freelancer
    const acceptedProposal = await prisma.proposals.findFirst({
      where: { jobId, freelancerId, status: "ACCEPTED" },
    })
    if (!acceptedProposal) return fail("You are not the accepted freelancer for this job", 403)

    const submission = await prisma.job_submissions.create({
      data: {
        submissionUrl,
        notes,
        jobs: { connect: { id: jobId } },
        users: { connect: { id: freelancerId } },
      },
    })

    // Notify employer
    await prisma.notifications.create({
      data: {
        title: "New Submission Received 📦",
        message: `A deliverable has been submitted for "${job.title}"`,
        users: { connect: { id: job.employerId } },
      },
    })

    logger.info("Submission created", { submissionId: submission.id, jobId })

    return ok(
      {
        id: submission.id,
        jobId: submission.jobId,
        submissionUrl: submission.submissionUrl,
        notes: submission.notes,
        status: submission.status,
        createdAt: submission.createdAt,
      },
      201,
    )
  } catch (err) {
    logger.error("POST /api/submissions failed", err)
    return fail("Internal server error", 500)
  }
}
