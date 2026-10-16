import { NextRequest } from "next/server"
import { prisma } from "@/lib/prisma"
import { ok, fail } from "@/lib/api-response"
import { requireAuth } from "@/lib/auth-helpers"
import { updateJobSchema } from "@/lib/validators/job"
import { logger } from "@/lib/logger"

type RouteContext = { params: Promise<{ id: string }> }

export async function GET(
  _request: NextRequest,
  context: RouteContext,
) {
  try {
    const { id } = await context.params

    const job = await prisma.jobs.findUnique({
      where: { id },
      include: {
        users: {
          select: {
            id: true,
            fullName: true,
            email: true,
            profiles: { select: { companyName: true, avatarUrl: true } },
          },
        },
        job_skills: { include: { skills: true } },
        proposals: {
          include: {
            users: {
              select: {
                id: true,
                fullName: true,
                profiles: { select: { avatarUrl: true } },
              },
            },
          },
          orderBy: { createdAt: "desc" },
        },
        _count: { select: { proposals: true } },
      },
    })

    if (!job) {
      return fail("Job not found", 404)
    }

    return ok({
      id: job.id,
      title: job.title,
      description: job.description,
      category: job.category,
      budget: Number(job.budget),
      estimatedHours: job.estimatedHours,
      status: job.status,
      deadline: job.deadline,
      createdAt: job.createdAt,
      updatedAt: job.updatedAt,
      employer: job.users,
      skills: job.job_skills.map((js) => js.skills),
      proposalCount: job._count.proposals,
      proposals: job.proposals.map((p) => ({
        id: p.id,
        coverLetter: p.coverLetter,
        bidAmount: Number(p.bidAmount),
        estimatedDays: p.estimatedDays,
        status: p.status,
        createdAt: p.createdAt,
        freelancer: p.users,
      })),
    })
  } catch (err) {
    logger.error("GET /api/jobs/[id] failed", err)
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

    const existing = await prisma.jobs.findUnique({ where: { id } })
    if (!existing) return fail("Job not found", 404)
    if (existing.employerId !== session!.user.id) return fail("Forbidden", 403)

    const body = await request.json()
    const parsed = updateJobSchema.safeParse(body)
    if (!parsed.success) {
      return fail("Validation failed", 400, parsed.error.flatten())
    }

    const { title, description, category, budget, deadline, skills, status } =
      parsed.data

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updateData: any = {}
    if (title) updateData.title = title
    if (description) updateData.description = description
    if (category) updateData.category = category
    if (budget) updateData.budget = budget
    if (deadline) updateData.deadline = new Date(deadline)
    if (status) updateData.status = status

    // Sync skills if provided
    if (skills) {
      await prisma.job_skills.deleteMany({ where: { jobId: id } })
      for (const name of skills) {
        const skill = await prisma.skills.upsert({
          where: { name },
          update: {},
          create: { name },
        })
        await prisma.job_skills.create({
          data: { jobId: id, skillId: skill.id },
        })
      }
    }

    const updated = await prisma.jobs.update({
      where: { id },
      data: updateData,
      include: {
        job_skills: { include: { skills: true } },
        users: { select: { id: true, fullName: true } },
      },
    })

    return ok({
      id: updated.id,
      title: updated.title,
      description: updated.description,
      category: updated.category,
      budget: Number(updated.budget),
      estimatedHours: updated.estimatedHours,
      status: updated.status,
      deadline: updated.deadline,
      employer: updated.users,
      skills: updated.job_skills.map((js) => js.skills),
    })
  } catch (err) {
    logger.error("PATCH /api/jobs/[id] failed", err)
    return fail("Internal server error", 500)
  }
}

export async function DELETE(
  _request: NextRequest,
  context: RouteContext,
) {
  try {
    const { error, session } = await requireAuth()
    if (error) return error

    const { id } = await context.params

    const existing = await prisma.jobs.findUnique({ where: { id } })
    if (!existing) return fail("Job not found", 404)
    if (existing.employerId !== session!.user.id) return fail("Forbidden", 403)

    await prisma.jobs.update({
      where: { id },
      data: { status: "CANCELLED" },
    })

    return ok({ message: "Job cancelled" })
  } catch (err) {
    logger.error("DELETE /api/jobs/[id] failed", err)
    return fail("Internal server error", 500)
  }
}
