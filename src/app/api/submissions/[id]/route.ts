import { NextRequest } from "next/server"
import { prisma } from "@/lib/prisma"
import { ok, fail } from "@/lib/api-response"
import { requireAuth } from "@/lib/auth-helpers"
import { logger } from "@/lib/logger"
import { z } from "zod"

const updateSubmissionSchema = z.object({
  status: z.enum(["APPROVED", "REVISION_REQUESTED"]),
  feedback: z.string().max(2000).optional(),
})

type RouteContext = { params: Promise<{ id: string }> }

export async function GET(
  _request: NextRequest,
  context: RouteContext,
) {
  try {
    const { id } = await context.params

    const submission = await prisma.job_submissions.findUnique({
      where: { id },
      include: {
        users: { select: { id: true, fullName: true, email: true } },
        jobs: { select: { id: true, title: true, employerId: true } },
      },
    })

    if (!submission) return fail("Submission not found", 404)

    return ok({
      id: submission.id,
      jobId: submission.jobId,
      submissionUrl: submission.submissionUrl,
      notes: submission.notes,
      status: submission.status,
      createdAt: submission.createdAt,
      updatedAt: submission.updatedAt,
      freelancer: submission.users,
      job: submission.jobs,
    })
  } catch (err) {
    logger.error("GET /api/submissions/[id] failed", err)
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
    const parsed = updateSubmissionSchema.safeParse(body)
    if (!parsed.success) {
      return fail("Validation failed", 400, parsed.error.flatten())
    }

    const { status } = parsed.data

    const submission = await prisma.job_submissions.findUnique({
      where: { id },
      include: {
        jobs: { select: { id: true, title: true, employerId: true } },
      },
    })

    if (!submission) return fail("Submission not found", 404)

    // Only employer can approve/request revision
    if (submission.jobs.employerId !== session!.user.id) {
      return fail("Forbidden", 403)
    }

    const updated = await prisma.job_submissions.update({
      where: { id },
      data: { status },
    })

    // Notify freelancer
    await prisma.notifications.create({
      data: {
        title: status === "APPROVED" ? "Submission Approved! ✅" : "Revision Requested 📝",
        message:
          status === "APPROVED"
            ? `Your submission for "${submission.jobs.title}" has been approved!`
            : `Revision requested for your submission on "${submission.jobs.title}"`,
        users: { connect: { id: submission.freelancerId } },
      },
    })

    logger.info("Submission updated", { submissionId: id, status })

    return ok({
      id: updated.id,
      status: updated.status,
      updatedAt: updated.updatedAt,
    })
  } catch (err) {
    logger.error("PATCH /api/submissions/[id] failed", err)
    return fail("Internal server error", 500)
  }
}
