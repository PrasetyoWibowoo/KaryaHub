import { z } from 'zod'

export const createJobSchema = z.object({
    title: z.string().min(5, 'Judul minimal 5 karakter').max(200),
    description: z.string().min(20, 'Deskripsi minimal 20 karakter'),
    category: z.string().min(1, 'Kategori wajib diisi'),
    budget: z.union([z.string(), z.number()]).transform((val) => Number(val)),
    estimatedHours: z.union([z.number(), z.string()]).transform((val) => Number(val)).pipe(z.number().int().min(1, 'Estimasi jam minimal 1')).optional(),
    deadline: z.string().optional(),
    skills: z.array(z.string()).optional(),
})

export const updateJobSchema = z.object({
    title: z.string().min(5).max(200).optional(),
    description: z.string().min(20).optional(),
    category: z.string().min(1).optional(),
    budget: z.union([z.string(), z.number()]).transform((val) => Number(val)).optional(),
    estimatedHours: z.union([z.number(), z.string()]).transform((val) => Number(val)).pipe(z.number().int().min(1)).optional(),
    deadline: z.string().optional(),
    skills: z.array(z.string()).optional(),
    status: z.enum(['OPEN', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED']).optional(),
})

export const jobQuerySchema = z.object({
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(50).default(20),
    category: z.string().optional(),
    search: z.string().optional(),
    mine: z.coerce.boolean().optional(),
    status: z.enum(['OPEN', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED']).optional(),
})
