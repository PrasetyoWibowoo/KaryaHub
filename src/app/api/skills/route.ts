import { ok, fail } from '@/lib/api-response'
import { prisma } from '@/lib/prisma'
import { logger } from '@/lib/logger'

export const runtime = 'nodejs'

export async function GET() {
  try {
    const skills = await prisma.skill.findMany({
      select: {
        id: true,
        name: true,
      },
      orderBy: {
        name: 'asc',
      },
    })

    return ok('Daftar skills', skills)
  } catch (err) {
    logger.error('skills.list', err)
    return fail('Terjadi kesalahan pada server', 500)
  }
}
