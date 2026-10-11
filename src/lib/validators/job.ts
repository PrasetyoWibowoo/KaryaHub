import { z } from 'zod'
import { Prisma } from '@/generated/prisma'

export const createJobSchema = z.object({
  title: z.string().min(5, 'Judul minimal 5 karakter').max(200),
  description: z.string().min(20, 'Deskripsi minimal 20 karakter'),
  category: z.string().min(1, 'Kategori wajib diisi'),
  budget: z.string().refine((val) => {
    try {
      const dec = new Prisma.Decimal(val)
      return dec.greaterThan(0)
    } catch {
      return false
    }
  }, 'Budget harus angka positif'),
  estimatedHours: z.number().int().min(1, 'Estimasi jam minimal 1'),
  deadline: z.string().datetime().optional(),
  skillIds: z.array(z.string().uuid()).min(1, 'Minimal 1 skill').max(10),
}).strict()

export const updateJobSchema = createJobSchema.partial().strict()

export const jobQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(20),
  category: z.string().optional(),
  search: z.string().optional(),
})
