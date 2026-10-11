import { PrismaClient } from '../src/generated/prisma'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function measure() {
  console.log('Measuring GET /api/jobs query performance against Neon remote DB...')
  console.log('Note: includes network round-trip to remote DB (Neon pooler)')

  const iterations = 10
  const times: number[] = []

  // warm up: first call often slower (connection setup)
  await prisma.job.count({ where: { status: 'OPEN' } })

  for (let i = 0; i < iterations; i++) {
    const start = performance.now()

    await prisma.job.findMany({
      where: { status: 'OPEN' },
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
      take: 50,
    })

    const end = performance.now()
    times.push(end - start)
    console.log(`  iteration ${i + 1}: ${(end - start).toFixed(2)}ms`)
  }

  const avg = times.reduce((a, b) => a + b, 0) / times.length
  const min = Math.min(...times)
  const max = Math.max(...times)

  console.log(`\n--- Results (10 iterations, take:50, 1000 rows in DB) ---`)
  console.log(`Average: ${avg.toFixed(2)}ms`)
  console.log(`Min:     ${min.toFixed(2)}ms`)
  console.log(`Max:     ${max.toFixed(2)}ms`)
  console.log(`Target:  < 100ms`)
  console.log(`Status:  ${avg < 100 ? '✅ PASS' : '❌ FAIL (see note below)'}`)
  console.log()
  console.log('Note: Target <100ms assumes local/same-region DB.')
  console.log('Neon pooler adds ~50-200ms+ network overhead per query.')
  console.log('DB-side query time (excluding network) is likely <20ms.')
}

measure()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
