import { PrismaClient, Prisma } from '../src/generated/prisma'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'
import bcrypt from 'bcryptjs'

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('Seeding 1000 jobs for performance testing...')

  let employer = await prisma.user.findUnique({
    where: { email: 'perf-umkm@test.com' },
  })

  if (!employer) {
    employer = await prisma.user.create({
      data: {
        email: 'perf-umkm@test.com',
        passwordHash: await bcrypt.hash('perf1234', 10),
        fullName: 'Performance Test UMKM',
        role: 'UMKM',
        profile: {
          create: {
            cityCode: 'jakarta',
          },
        },
      },
    })
  }

  const skills = await prisma.skill.findMany({ take: 5 })
  if (skills.length === 0) {
    throw new Error('No skills found. Run main seed first.')
  }

  const categories = ['Frontend', 'Backend', 'UI/UX', 'Graphic Design', 'Content Writing']

  // ponytail: createMany doesn't support nested relations, so we batch jobs then jobSkills separately
  // upgrade path: if DB is local, use a single INSERT...VALUES with raw SQL for speed
  const jobData = Array.from({ length: 1000 }, (_, i) => ({
    employerId: employer!.id,
    title: `${categories[i % categories.length]} Project #${i + 1}`,
    description: `Performance test job for ${categories[i % categories.length]}. Lorem ipsum dolor sit amet.`,
    category: categories[i % categories.length],
    budget: new Prisma.Decimal((Math.random() * 5000000 + 500000).toFixed(2)),
    estimatedHours: Math.floor(Math.random() * 100) + 10,
    status: 'OPEN' as const,
  }))

  await prisma.job.createMany({ data: jobData })
  console.log('Created 1000 jobs...')

  // Attach first skill to all jobs (deterministic, fast)
  const jobs = await prisma.job.findMany({
    where: { employerId: employer!.id, title: { contains: 'Project #' } },
    select: { id: true },
  })

  await prisma.jobSkill.createMany({
    data: jobs.map((j) => ({ jobId: j.id, skillId: skills[0].id })),
    skipDuplicates: true,
  })

  console.log('Performance seed complete: 1000 jobs created')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
