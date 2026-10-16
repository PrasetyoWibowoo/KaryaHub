import { prisma } from "@/lib/prisma"
import { ok, fail } from "@/lib/api-response"
import { logger } from "@/lib/logger"

export async function GET() {
  try {
    const skills = await prisma.skills.findMany({
      orderBy: { name: "asc" },
      select: { id: true, name: true },
    })
    return ok({ skills })
  } catch (err) {
    logger.error("GET /api/skills failed", err)
    return fail("Internal server error", 500)
  }
}
