import { NextResponse } from 'next/server'

export function ok<T = unknown>(
  data?: T,
  status: number = 200
) {
  return NextResponse.json(
    { success: true, data },
    { status }
  )
}

export function fail(
  message: string,
  status: number = 400,
  errors?: unknown
) {
  return NextResponse.json(
    { success: false, message, errors },
    { status }
  )
}
