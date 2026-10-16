import { signOut } from "@/lib/auth"
import { ok } from "@/lib/api-response"

export async function POST() {
    await signOut({ redirect: false })
    return ok({ message: "Logged out" })
}
