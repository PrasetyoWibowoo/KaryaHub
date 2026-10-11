import { auth } from '@/lib/auth'
import { ok, fail } from '@/lib/api-response'

export const runtime = 'nodejs'

export async function GET() {
  const session = await auth()

  if (!session?.user?.id) {
    return fail('Unauthorized', 401)
  }

  return ok('Session aktif', {
    user: {
      id: session.user.id,
      email: session.user.email,
      name: session.user.name,
      role: session.user.role,
    },
  })
}
