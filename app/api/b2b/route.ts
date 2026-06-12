import { NextResponse } from 'next/server'
import { forwardLead } from '@/lib/notify'

// Recibe solicitudes B2B (restaurantes / hoteles / catering).
export async function POST(request: Request) {
  let data: Record<string, unknown>
  try {
    data = await request.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 })
  }

  const business = String(data.business ?? '').trim()
  const contact = String(data.contact ?? '').trim()
  const email = String(data.email ?? '').trim()
  const phone = String(data.phone ?? '').trim()

  if (!business || !contact || !phone || !email || !/.+@.+\..+/.test(email)) {
    return NextResponse.json({ ok: false, error: 'validation' }, { status: 422 })
  }

  await forwardLead('b2b', {
    business,
    type: String(data.type ?? '').trim(),
    contact,
    phone,
    email,
    message: String(data.message ?? '').trim(),
  })

  return NextResponse.json({ ok: true })
}
