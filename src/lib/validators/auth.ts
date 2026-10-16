import { z } from 'zod'

export const registerSchema = z.object({
    email: z.string().email('Email tidak valid'),
    password: z.string().min(8, 'Password minimal 8 karakter'),
    fullName: z.string().min(2, 'Nama lengkap minimal 2 karakter'),
    role: z.enum(['FREELANCER', 'UMKM'], {
        message: 'Role harus FREELANCER atau UMKM',
    }),
    // Optional freelancer fields
    skills: z.array(z.string()).optional(),
    experience: z.string().optional(),
    bio: z.string().optional(),
    portfolioUrl: z.string().optional(),
    // Optional UMKM fields
    companyName: z.string().optional(),
    businessType: z.string().optional(),
    companySize: z.string().optional(),
    phoneNumber: z.string().optional(),
})
