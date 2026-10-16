import { z } from 'zod'

export const chargeSchema = z.object({
    jobId: z.string().min(1, 'jobId wajib diisi'),
})

export const releaseSchema = z.object({
    escrowId: z.string().min(1, 'escrowId wajib diisi'),
})
