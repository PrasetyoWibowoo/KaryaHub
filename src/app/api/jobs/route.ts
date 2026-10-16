import { NextRequest } from "next/server"
import { prisma } from "@/lib/prisma"
import { ok, fail } from "@/lib/api-response"
import { requireAuth, requireRole } from "@/lib/auth-helpers"
import { createJobSchema, jobQuerySchema } from "@/lib/validators/job"
import { validateFairRate } from "@/lib/guardrails"
import { logger } from "@/lib/logger"

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const raw = {
      page: url.searchParams.get("page") ?? "1",
      limit: url.searchParams.get("limit") ?? "10",
      search: url.searchParams.get("search") ?? undefined,
      category: url.searchParams.get("category") ?? undefined,
      status: url.searchParams.get("status") ?? undefined,
      mine: url.searchParams.get("mine") ?? undefined,
    }

    const parsed = jobQuerySchema.safeParse(raw)
    if (!parsed.success) {
      return fail("Invalid query params", 400, parsed.error.flatten())
    }

    const { page, limit, search, category, status, mine } = parsed.data
    const skip = (page - 1) * limit

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: any = {}

    if (mine) {
      const { error, session } = await requireAuth()
      if (error) return error
      where.employerId = session!.user.id
    }

    if (status) where.status = status
    if (category) where.category = category

    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ]
    }

    const [jobs, total] = await Promise.all([
      prisma.jobs.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          users: { select: { id: true, fullName: true, email: true } },
          job_skills: { include: { skills: true } },
          _count: { select: { proposals: true } },
        },
      }),
      prisma.jobs.count({ where }),
    ])

    return ok({
      jobs: jobs.map((j) => ({
        id: j.id,
        title: j.title,
        description: j.description,
        category: j.category,
        budget: Number(j.budget),
        estimatedHours: j.estimatedHours,
        status: j.status,
        deadline: j.deadline,
        createdAt: j.createdAt,
        updatedAt: j.updatedAt,
        employer: j.users,
        skills: j.job_skills.map((js) => js.skills),
        proposalCount: j._count.proposals,
      })),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (err) {
    logger.error("GET /api/jobs failed", err)
    return fail("Internal server error", 500)
  }
}

export async function POST(request: NextRequest) {
  try {
    const { error, session } = await requireRole(["UMKM"])
    if (error) return error

    const body = await request.json()
    const parsed = createJobSchema.safeParse(body)
    if (!parsed.success) {
      return fail("Validation failed", 400, parsed.error.flatten())
    }

    const { title, description, category, budget, deadline, skills, estimatedHours } =
      parsed.data

    // Fair-rate check
    const fairCheck = await validateFairRate({
      budget,
      estimatedHours: estimatedHours ?? 1,
    })
    if (!fairCheck.fair) {
      return fail(fairCheck.reason ?? "Budget below minimum fair rate", 422)
    }

    // Prepare skill connections
    let skillConnections: { skillId: string }[] = []
    if (skills?.length) {
      skillConnections = await Promise.all(
        skills.map(async (name: string) => {
          const skill = await prisma.skills.upsert({
            where: { name },
            update: {},
            create: { name },
          })
          return { skillId: skill.id }
        }),
      )
    }

    const job = await prisma.jobs.create({
      data: {
        title,
        description,
        category,
        budget,
        estimatedHours: estimatedHours ?? 1,
        deadline: deadline ? new Date(deadline) : null,
        users: { connect: { id: session.user.id } },
        job_skills: skillConnections.length
          ? { create: skillConnections }
          : undefined,
      },
      include: {
        job_skills: { include: { skills: true } },
        users: { select: { id: true, fullName: true } },
      },
    })

    logger.info("Job created", { jobId: job.id, employerId: session.user.id })

    return ok(
      {
        id: job.id,
        title: job.title,
        description: job.description,
        category: job.category,
        budget: Number(job.budget),
        estimatedHours: job.estimatedHours,
        status: job.status,
        deadline: job.deadline,
        createdAt: job.createdAt,
        employer: job.users,
        skills: job.job_skills.map((js) => js.skills),
      },
      201,
    )
  } catch (err) {
    logger.error("POST /api/jobs failed", err)
    return fail("Internal server error", 500)
  }
}
