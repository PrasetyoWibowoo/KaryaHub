import { NextRequest } from "next/server"

// Redirect legacy /api/register to /api/auth/register
export async function POST(req: NextRequest) {
  const { headers } = await import("next/headers")
  const body = await req.json()

  const origin = req.nextUrl.origin
  const res = await fetch(`${origin}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })

  const data = await res.json()
  const { NextResponse } = await import("next/server")
  return NextResponse.json(data, { status: res.status })
}
