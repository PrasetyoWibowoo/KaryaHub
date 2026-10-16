import { auth } from '@/lib/auth'
import { fail } from '@/lib/api-response'
import type { Role } from '@/generated/prisma'

export async function requireAuth() {
    const session = await auth()
    if (!session?.user?.id) {
        return { error: fail('Unauthorized', 401), session: null }
    }
    return { error: null, session }
}

export async function requireRole(allowedRoles: Role[]) {
    const { error, session } = await requireAuth()
    if (error) return { error, session: null }

    if (!allowedRoles.includes(session!.user.role as Role)) {
        return { error: fail('Forbidden', 403), session: null }
    }

    return { error: null, session: session! }
}
