import { PrismaClient, Prisma } from '../src/generated/prisma'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'
import bcrypt from 'bcryptjs'

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('Seeding database...')

  // Seed minimum wages
  const wages = [
    { cityCode: 'jakarta', cityName: 'Jakarta', hourlyRate: '33120.67', year: 2026 },
    { cityCode: 'bandung', cityName: 'Bandung', hourlyRate: '27385.42', year: 2026 },
    { cityCode: 'surabaya', cityName: 'Surabaya', hourlyRate: '30571.07', year: 2026 },
    { cityCode: 'medan', cityName: 'Medan', hourlyRate: '25058.37', year: 2026 },
    { cityCode: 'default', cityName: 'Default (Nasional)', hourlyRate: '33120.67', year: 2026 },
  ]

  for (const wage of wages) {
    await prisma.minimumWage.upsert({
      where: { cityCode: wage.cityCode },
      update: {},
      create: {
        cityCode: wage.cityCode,
        cityName: wage.cityName,
        hourlyRate: new Prisma.Decimal(wage.hourlyRate),
        year: wage.year,
      },
    })
  }
  console.log('✓ Seeded minimum wages')

  // Seed skills
  const skillNames = [
    'Frontend Development',
    'Backend Development',
    'UI/UX Design',
    'Graphic Design',
    'Social Media Management',
    'Content Writing',
    'Video Editing',
    'SEO Optimization',
  ]

  for (const name of skillNames) {
    await prisma.skill.upsert({
      where: { name },
      update: {},
      create: { name },
    })
  }
  console.log('✓ Seeded skills')

  // Seed demo users
  const freelancerEmail = 'freelancer@demo.com'
  const umkmEmail = 'umkm@demo.com'

  const freelancer = await prisma.user.upsert({
    where: { email: freelancerEmail },
    update: {},
    create: {
      email: freelancerEmail,
      passwordHash: await bcrypt.hash('demo1234', 10),
      fullName: 'Budi Freelancer',
      role: 'FREELANCER',
      profile: {
        create: {},
      },
    },
  })
  console.log('✓ Seeded FREELANCER demo user')

  const umkm = await prisma.user.upsert({
    where: { email: umkmEmail },
    update: {},
    create: {
      email: umkmEmail,
      passwordHash: await bcrypt.hash('demo1234', 10),
      fullName: 'Toko UMKM',
      role: 'UMKM',
      profile: {
        create: {
          cityCode: 'jakarta',
          companyName: 'Toko Demo',
        },
      },
    },
  })
  console.log('✓ Seeded UMKM demo user')

  console.log('Seed complete!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
