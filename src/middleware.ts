import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(request: NextRequest) {
  const token = await getToken({ 
    req: request,
    secret: process.env.NEXTAUTH_SECRET || "karyahub-secret-key-change-in-production"
  })
  
  const { pathname } = request.nextUrl
  const isLoggedIn = !!token
  const userRole = token?.role

  // Protected dashboard routes
  // Auth routes
  const isAuthRoute = pathname.startsWith("/login") || pathname.startsWith("/register")

  // If logged in and trying to access auth routes, redirect to dashboard
  if (isAuthRoute && isLoggedIn) {
    const redirectPath = userRole === "FREELANCER" ? "/freelancer" : "/umkm"
    return NextResponse.redirect(new URL(redirectPath, request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/freelancer/:path*",
    "/umkm/:path*",
    "/login",
    "/register"
  ]
}
