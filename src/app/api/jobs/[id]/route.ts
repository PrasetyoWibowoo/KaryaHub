import { fail, ok } from '@/lib/api-response'
import { prisma } from '@/lib/prisma'
import { logger } from '@/lib/logger'
import { requireRole } from '@/lib/auth-helpers'
import { updateJobSchema } from '@/lib/validators/job'
import { validateFairRate } from '@/lib/guardrails'
import { Prisma } from '@/generated/prisma'

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  try {
    const job = await prisma.job.findUnique({
      where: { id },
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
        updatedAt: true,
        employer: {
          select: {
            id: true,
            fullName: true,
            profile: {
              select: {
                companyName: true,
                avatarUrl: true,
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
    })

    if (!job) {
      return fail('Pekerjaan tidak ditemukan', 404)
    }

    return ok('Detail pekerjaan', job)
  } catch (err) {
    logger.error('jobs.detail', err, { jobId: id })
    return fail('Terjadi kesalahan pada server', 500)
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { error, session } = await requireRole(['UMKM', 'ADMIN'])
  if (error) return error

  const { id } = await params
  const body = await req.json().catch(() => null)
  const parsed = updateJobSchema.safeParse(body)

  if (!parsed.success) {
    return fail('Input tidak valid', 400, parsed.error.flatten())
  }

  try {
    const existingJob = await prisma.job.findUnique({
      where: { id },
      select: {
        employerId: true,
        status: true,
        budget: true,
        estimatedHours: true,
      },
    })

    if (!existingJob) {
      return fail('Pekerjaan tidak ditemukan', 404)
    }

    if (session.user.role !== 'ADMIN' && existingJob.employerId !== session.user.id) {
      return fail('Forbidden', 403)
    }

    if (existingJob.status !== 'OPEN') {
      return fail('Hanya pekerjaan dengan status OPEN yang bisa diubah', 409)
    }

    const { budget, estimatedHours, skillIds, ...restData } = parsed.data

    if (budget || estimatedHours) {
      const profile = await prisma.profile.findUnique({
        where: { userId: existingJob.employerId },
        select: { cityCode: true },
      })

      const finalBudget = budget ? new Prisma.Decimal(budget) : existingJob.budget
      const finalHours = estimatedHours ?? existingJob.estimatedHours

      const validation = await validateFairRate({
        budget: finalBudget,
        estimatedHours: finalHours,
        cityCode: profile?.cityCode,
      })

      if (!validation.valid) {
        return fail(validation.message!, 422, {
          hourlyRate: validation.hourlyRate?.toString(),
          minimumRate: validation.minimumRate?.toString(),
          suggestedBudget: validation.suggestedBudget?.toString(),
        })
      }
    }

    const updatedJob = await prisma.$transaction(async (tx) => {
      const job = await tx.job.update({
        where: { id },
        data: {
          ...restData,
          ...(budget && { budget: new Prisma.Decimal(budget) }),
          ...(estimatedHours && { estimatedHours }),
          ...(parsed.data.deadline && { deadline: new Date(parsed.data.deadline) }),
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
          updatedAt: true,
        },
      })

      if (skillIds) {
        await tx.jobSkill.deleteMany({ where: { jobId: id } })
        await tx.jobSkill.createMany({
          data: skillIds.map((skillId) => ({ jobId: id, skillId })),
        })
      }

      return job
    })

    return ok('Pekerjaan berhasil diperbarui', updatedJob)
  } catch (err) {
    logger.error('jobs.update', err, { jobId: id, userId: session.user.id })
    return fail('Terjadi kesalahan pada server', 500)
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { error, session } = await requireRole(['UMKM', 'ADMIN'])
  if (error) return error

  const { id } = await params

  try {
    const existingJob = await prisma.job.findUnique({
      where: { id },
      select: {
        employerId: true,
        status: true,
      },
    })

    if (!existingJob) {
      return fail('Pekerjaan tidak ditemukan', 404)
    }

    if (session.user.role !== 'ADMIN' && existingJob.employerId !== session.user.id) {
      return fail('Forbidden', 403)
    }

    if (existingJob.status !== 'OPEN') {
      return fail('Hanya pekerjaan dengan status OPEN yang bisa dibatalkan', 409)
    }

    await prisma.job.update({
      where: { id },
      data: { status: 'CANCELLED' },
    })

    return ok('Pekerjaan berhasil dibatalkan')
  } catch (err) {
    logger.error('jobs.cancel', err, { jobId: id, userId: session.user.id })
    return fail('Terjadi kesalahan pada server', 500)
  }
}

