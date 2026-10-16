import { z } from 'zod'

export const createProposalSchema = z.object({
    jobId: z.string().min(1, 'jobId wajib diisi'),
    coverLetter: z.string().max(2000).optional(),
    bidAmount: z.union([z.string(), z.number()]).transform((val) => Number(val)),
    estimatedDays: z.union([z.number(), z.string()]).transform((val) => Number(val)).pipe(z.number().int().min(1, 'estimatedDays minimal 1')),
})

export const decisionSchema = z.object({
    decision: z.enum(['accept', 'reject']),
})

export const proposalQuerySchema = z.object({
    jobId: z.string().optional(),
    status: z.enum(['PENDING', 'ACCEPTED', 'REJECTED']).optional(),
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(50).default(20),
})
