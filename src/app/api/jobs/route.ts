import { ok, fail } from '@/lib/api-response'
import { prisma } from '@/lib/prisma'
import { requireRole } from '@/lib/auth-helpers'
import { createJobSchema, jobQuerySchema } from '@/lib/validators/job'
import { validateFairRate } from '@/lib/guardrails'
import { logger } from '@/lib/logger'
import { Prisma } from '@/generated/prisma'

export const runtime = 'nodejs'

export async function POST(req: Request) {
  const { error, session } = await requireRole(['UMKM', 'ADMIN'])
  if (error) return error

  const body = await req.json().catch(() => null)
  const parsed = createJobSchema.safeParse(body)

  if (!parsed.success) {
    return fail('Input tidak valid', 400, parsed.error.flatten())
  }

  const { title, description, category, budget, estimatedHours, deadline, skillIds } = parsed.data

  try {
    const profile = await prisma.profile.findUnique({
      where: { userId: session.user.id },
      select: { cityCode: true },
    })

    if (!profile?.cityCode) {
      return fail('Profile cityCode wajib diisi untuk membuat pekerjaan', 422)
    }

    const skills = await prisma.skill.findMany({
      where: { id: { in: skillIds } },
      select: { id: true },
    })

    if (skills.length !== skillIds.length) {
      return fail('Beberapa skill tidak valid', 400)
    }

    const budgetDecimal = new Prisma.Decimal(budget)
    const validation = await validateFairRate({
      budget: budgetDecimal,
      estimatedHours,
      cityCode: profile.cityCode,
    })

    if (!validation.valid) {
      return fail(validation.message!, 422, {
        hourlyRate: validation.hourlyRate?.toString(),
        minimumRate: validation.minimumRate?.toString(),
        suggestedBudget: validation.suggestedBudget?.toString(),
      })
    }

    const job = await prisma.$transaction(async (tx) => {
      const newJob = await tx.job.create({
        data: {
          employerId: session.user.id,
          title,
          description,
          category,
          budget: budgetDecimal,
          estimatedHours,
          deadline: deadline ? new Date(deadline) : null,
        },
        select: {
          id: true,
          title: true,
          description: true,
          category: true,
          budget: true,
          estimatedHours: true,
          deadline: true,
          status: true,
          createdAt: true,
        },
      })

      await tx.jobSkill.createMany({
        data: skillIds.map((skillId) => ({
          jobId: newJob.id,
          skillId,
        })),
      })

      return newJob
    })

    return ok('Pekerjaan berhasil dibuat', job, 201)
  } catch (err) {
    logger.error('jobs.create', err, { userId: session.user.id })
    return fail('Terjadi kesalahan pada server', 500)
  }
}

export async function GET(req: Request) {
  const url = new URL(req.url)
  const parsed = jobQuerySchema.safeParse({
    page: url.searchParams.get('page'),
    limit: url.searchParams.get('limit'),
    category: url.searchParams.get('category'),
    search: url.searchParams.get('search'),
  })

  if (!parsed.success) {
    return fail('Query parameter tidak valid', 400, parsed.error.flatten())
  }

  const { page, limit, category, search } = parsed.data
  const skip = (page - 1) * limit

  try {
    const where: Prisma.JobWhereInput = {
      status: 'OPEN',
      ...(category && { category }),
      ...(search && {
        OR: [
          { title: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
        ],
      }),
    }

    const [jobs, total] = await Promise.all([
      prisma.job.findMany({
        where,
        select: {
          id: true,
          title: true,
          description: true,
          category: true,
          budget: true,
          estimatedHours: true,
          deadline: true,
          createdAt: true,
          employer: {
            select: {
              id: true,
              fullName: true,
              profile: {
                select: {
                  companyName: true,
                },
              },
            },
          },
          jobSkills: {
            select: {
              skill: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
          _count: {
            select: {
              proposals: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.job.count({ where }),
    ])

    return ok('Daftar pekerjaan', {
      jobs,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (err) {
    logger.error('jobs.list', err)
    return fail('Terjadi kesalahan pada server', 500)
  }
}

