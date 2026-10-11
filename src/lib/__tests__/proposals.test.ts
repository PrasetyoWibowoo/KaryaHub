import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { createProposalSchema, proposalQuerySchema } from '@/lib/validators/proposal'
import { prisma } from '@/lib/prisma'
import { Prisma } from '@/generated/prisma'

describe('createProposalSchema', () => {
  it('should validate correct payload', () => {
    const validData = {
      jobId: '123e4567-e89b-12d3-a456-426614174000',
      coverLetter: 'Saya siap mengerjakan proyek ini.',
      bidAmount: '1500000',
      estimatedDays: 5,
    }
    const result = createProposalSchema.safeParse(validData)
    expect(result.success).toBe(true)
  })

  it('should reject extra fields due to strict schema', () => {
    const dataWithExtra = {
      jobId: '123e4567-e89b-12d3-a456-426614174000',
      bidAmount: '1500000',
      estimatedDays: 5,
      freelancerId: 'hacker-id',
    }
    const result = createProposalSchema.safeParse(dataWithExtra)
    expect(result.success).toBe(false)
  })

  it('should reject non-positive bidAmount', () => {
    const invalidData = {
      jobId: '123e4567-e89b-12d3-a456-426614174000',
      bidAmount: '-1000',
      estimatedDays: 5,
    }
    const result = createProposalSchema.safeParse(invalidData)
    expect(result.success).toBe(false)
  })

  it('should reject non-UUID jobId', () => {
    const invalidData = {
      jobId: 'invalid-job-id',
      bidAmount: '500000',
      estimatedDays: 3,
    }
    const result = createProposalSchema.safeParse(invalidData)
    expect(result.success).toBe(false)
  })
})

describe('Proposal DB Constraints & Invariants', () => {
  let testEmployerId: string
  let testFreelancerId: string
  let testJobId: string

  beforeAll(async () => {
    const employer = await prisma.user.create({
      data: {
        email: `employer-${Date.now()}@test.com`,
        passwordHash: 'hash',
        fullName: 'Test Employer Proposal',
        role: 'UMKM',
      },
    })
    testEmployerId = employer.id

    const freelancer = await prisma.user.create({
      data: {
        email: `freelancer-${Date.now()}@test.com`,
        passwordHash: 'hash',
        fullName: 'Test Freelancer Proposal',
        role: 'FREELANCER',
      },
    })
    testFreelancerId = freelancer.id

    const job = await prisma.job.create({
      data: {
        employerId: testEmployerId,
        title: 'Job Test Proposal',
        description: 'Job description for proposal unit test',
        category: 'Development',
        budget: new Prisma.Decimal('1000000'),
        estimatedHours: 20,
        status: 'OPEN',
      },
    })
    testJobId = job.id
  })

  afterAll(async () => {
    await prisma.proposal.deleteMany({ where: { jobId: testJobId } })
    await prisma.job.deleteMany({ where: { id: testJobId } })
    await prisma.user.deleteMany({
      where: { id: { in: [testEmployerId, testFreelancerId] } },
    })
  })

  it('should enforce unique constraint [jobId, freelancerId] (P2002 on duplicate)', async () => {
    await prisma.proposal.create({
      data: {
        jobId: testJobId,
        freelancerId: testFreelancerId,
        bidAmount: new Prisma.Decimal('900000'),
        estimatedDays: 4,
      },
    })

    await expect(
      prisma.proposal.create({
        data: {
          jobId: testJobId,
          freelancerId: testFreelancerId,
          bidAmount: new Prisma.Decimal('850000'),
          estimatedDays: 3,
        },
      })
    ).rejects.toThrow()
  })
})

describe('proposalQuerySchema', () => {
  it('should default page/limit when omitted', () => {
    const result = proposalQuerySchema.safeParse({})
    expect(result.success).toBe(true)
    expect(result.data).toMatchObject({ page: 1, limit: 20 })
  })

  it('should reject limit above 50', () => {
    const result = proposalQuerySchema.safeParse({ limit: 100 })
    expect(result.success).toBe(false)
  })

  it('should coerce string page/limit to numbers', () => {
    const result = proposalQuerySchema.safeParse({ page: '3', limit: '10' })
    expect(result.success).toBe(true)
    expect(result.data).toMatchObject({ page: 3, limit: 10 })
  })

  it('should accept optional jobId as UUID', () => {
    const result = proposalQuerySchema.safeParse({ jobId: '123e4567-e89b-12d3-a456-426614174000' })
    expect(result.success).toBe(true)
  })

  it('should reject invalid jobId', () => {
    const result = proposalQuerySchema.safeParse({ jobId: 'not-a-uuid' })
    expect(result.success).toBe(false)
  })
})
