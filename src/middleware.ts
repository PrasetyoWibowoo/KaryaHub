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
  const isFreelancerRoute = pathname.startsWith("/freelancer")
  const isUMKMRoute = pathname.startsWith("/umkm")
  const isProtectedRoute = isFreelancerRoute || isUMKMRoute

  // Auth routes
  const isAuthRoute = pathname.startsWith("/login") || pathname.startsWith("/register")

  // If trying to access protected route without login
  if (isProtectedRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // If logged in and trying to access auth routes, redirect to dashboard
  if (isAuthRoute && isLoggedIn) {
    const redirectPath = userRole === "FREELANCER" ? "/freelancer" : "/umkm"
    return NextResponse.redirect(new URL(redirectPath, request.url))
  }

  // Role-based access control
  if (isLoggedIn && isProtectedRoute) {
    if (isFreelancerRoute && userRole !== "FREELANCER") {
      return NextResponse.redirect(new URL("/umkm", request.url))
    }
    if (isUMKMRoute && userRole !== "UMKM") {
      return NextResponse.redirect(new URL("/freelancer", request.url))
    }
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
