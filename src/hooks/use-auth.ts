"use client"

import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useCallback, useState } from "react"

export interface RegisterPayload {
    name: string
    email: string
    password: string
    phone: string
    role: "freelancer" | "umkm"
    skills?: string[]
    experience?: string
    portfolio?: string
    bio?: string
    businessType?: string
    companySize?: string
    industry?: string
    website?: string
    description?: string
}

export function useAuth() {
    const { data: session, status, update } = useSession()
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const user = session?.user ?? null
    const isAuthenticated = status === "authenticated"
    const isSessionLoading = status === "loading"

    const login = useCallback(
        async (email: string, password: string) => {
            setIsLoading(true)
            setError(null)
            try {
                const result = await signIn("credentials", {
                    email,
                    password,
                    redirect: false,
                })

                if (result?.error) {
                    setError("Invalid email or password")
                    return false
                }

                // Redirect based on role from session
                // Force a session refresh first
                const updatedSession = await update()
                const role = updatedSession?.user?.role

                if (role === "UMKM") {
                    router.push("/umkm")
                } else {
                    router.push("/freelancer")
                }

                return true
            } catch (err) {
                setError("An unexpected error occurred")
                return false
            } finally {
                setIsLoading(false)
            }
        },
        [router, update]
    )

    const register = useCallback(
        async (payload: RegisterPayload) => {
            setIsLoading(true)
            setError(null)
            try {
                const res = await fetch("/api/auth/register", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                })

                const data = await res.json()

                if (!res.ok) {
                    setError(data.message || "Registration failed")
                    return false
                }

                return true
            } catch (err) {
                setError("An unexpected error occurred")
                return false
            } finally {
                setIsLoading(false)
            }
        },
        []
    )

    const logout = useCallback(async () => {
        setIsLoading(true)
        try {
            await signOut({ redirect: false })
            router.push("/login")
        } finally {
            setIsLoading(false)
        }
    }, [router])

    return {
        user,
        session,
        isAuthenticated,
        isSessionLoading,
        isLoading,
        error,
        login,
        register,
        logout,
        clearError: () => setError(null),
    }
}
