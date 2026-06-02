import { NextResponse } from 'next/server'
export async function GET() {
  const t = process.env.META_ACCESS_TOKEN ?? ''
  return NextResponse.json({ len: t.length, first20: t.slice(0, 20), last20: t.slice(-20) })
}
