import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  // Auth routes
  const isAuthRoute = pathname.startsWith("/login") || pathname.startsWith("/register")

  // Preview mode does not require authentication; open the existing dashboard directly.
  if (isAuthRoute) {
    return NextResponse.redirect(new URL("/freelancer", request.url))
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
