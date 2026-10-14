import { z } from 'zod'

export const chargeSchema = z.object({
  jobId: z.string().uuid('jobId harus UUID'),
}).strict()

export const releaseSchema = z.object({
  jobId: z.string().uuid('jobId harus UUID'),
}).strict()
