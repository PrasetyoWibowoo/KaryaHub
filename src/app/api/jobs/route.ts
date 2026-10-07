import { ok } from '@/lib/api-response'
import { prisma } from '@/lib/prisma'

export const runtime = 'nodejs'

export async function GET() {
  const jobs = await prisma.job.findMany({
    where: { status: 'OPEN' },
    select: {
      id: true,
      title: true,
      description: true,
      category: true,
      budget: true,
      deadline: true,
      createdAt: true,
      employer: {
        select: {
          id: true,
          fullName: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
    take: 50,
  })

  return ok('Daftar pekerjaan', jobs)
}
