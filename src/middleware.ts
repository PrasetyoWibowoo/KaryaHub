import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// NextAuth v5 stores the session token in this cookie name
// For JWT strategy the cookie is `authjs.session-token` (non-secure) or
// `__Secure-authjs.session-token` (HTTPS). We check both.
function hasSessionToken(req: NextRequest): boolean {
  return (
    req.cookies.has("authjs.session-token") ||
    req.cookies.has("__Secure-authjs.session-token")
  )
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isLoggedIn = hasSessionToken(request)

  // Public routes that should never be gated
  const publicPaths = ["/", "/jobs", "/api"]
  const isPublic =
    publicPaths.some((p) => pathname === p || pathname.startsWith(p + "/")) ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/uploads") ||
    pathname.match(/\.(ico|png|jpg|svg|css|js|woff2?)$/)

  if (isPublic) return NextResponse.next()

  // Auth routes — if already logged in, redirect to dashboard
  const isAuthRoute = pathname === "/login" || pathname === "/register"
  if (isAuthRoute) {
    if (isLoggedIn) {
      // We can't decode the JWT here easily in Edge, so redirect to a generic dashboard.
      // The dashboard page itself will redirect based on role.
      return NextResponse.redirect(new URL("/freelancer", request.url))
    }
    return NextResponse.next()
  }

  // Protected dashboard routes — require authentication
  const isProtected =
    pathname.startsWith("/freelancer") || pathname.startsWith("/umkm")

  if (isProtected && !isLoggedIn) {
    const loginUrl = new URL("/login", request.url)
    loginUrl.searchParams.set("callbackUrl", pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/freelancer/:path*",
    "/umkm/:path*",
    "/login",
    "/register",
  ],
}
