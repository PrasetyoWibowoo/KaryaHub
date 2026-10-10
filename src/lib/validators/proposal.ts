import { z } from 'zod'
import { Prisma } from '@/generated/prisma'

export const createProposalSchema = z.object({
  jobId: z.string().uuid('jobId harus UUID'),
  coverLetter: z.string().max(2000).optional(),
  bidAmount: z.string().refine((val) => {
    try { return new Prisma.Decimal(val).greaterThan(0) } catch { return false }
  }, 'bidAmount harus angka positif'),
  estimatedDays: z.number().int().min(1, 'estimatedDays minimal 1'),
}).strict()

export const decisionSchema = z.object({
  status: z.enum(['ACCEPTED', 'REJECTED']),
}).strict()

export const proposalQuerySchema = z.object({
  jobId: z.string().uuid().optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(20),
})
