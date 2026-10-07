import { ok, fail } from '@/lib/api-response'
import { prisma } from '@/lib/prisma'
import { registerSchema } from '@/lib/validators/auth'
import { logger } from '@/lib/logger'
import bcrypt from 'bcryptjs'

export const runtime = 'nodejs'

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null)
    const parsed = registerSchema.safeParse(body)

    if (!parsed.success) {
      return fail('Input tidak valid', 400, parsed.error.flatten())
    }

    const { email, password, fullName, role } = parsed.data

    const normalizedEmail = email.toLowerCase()

    const existing = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    })

    if (existing) {
      return fail('Email sudah terdaftar', 409)
    }

    const passwordHash = await bcrypt.hash(password, 10)

    const user = await prisma.$transaction(async (tx) => {
      const newUser = await tx.user.create({
        data: {
          email: normalizedEmail,
          passwordHash,
          fullName,
          role,
        },
        select: {
          id: true,
          email: true,
          fullName: true,
          role: true,
          createdAt: true,
        },
      })

      await tx.profile.create({
        data: {
          userId: newUser.id,
        },
      })

      return newUser
    })

    return ok('Registrasi berhasil', user, 201)
  } catch (err) {
    logger.error('register.error', err, { endpoint: '/api/register' })
    return fail('Terjadi kesalahan pada server', 500)
  }
}
