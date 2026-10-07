import { NextResponse } from 'next/server'

export function ok<T = unknown>(
  message: string,
  data?: T,
  status: number = 200
) {
  return NextResponse.json(
    { success: true, message, data },
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
