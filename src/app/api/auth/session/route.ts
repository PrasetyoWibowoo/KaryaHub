import { auth } from "@/lib/auth"
import { ok, fail } from "@/lib/api-response"

export async function GET() {
    const session = await auth()
    if (!session?.user) {
        return fail("Not authenticated", 401)
    }
    return ok(session.user)
}
