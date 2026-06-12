import { NextResponse } from 'next/server'
import { forwardLead } from '@/lib/notify'

// Recibe el formulario de contacto general.
export async function POST(request: Request) {
  let data: Record<string, unknown>
  try {
    data = await request.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 })
  }

  const name = String(data.name ?? '').trim()
  const email = String(data.email ?? '').trim()
  const message = String(data.message ?? '').trim()

  if (!name || !email || !message || !/.+@.+\..+/.test(email)) {
    return NextResponse.json({ ok: false, error: 'validation' }, { status: 422 })
  }

  await forwardLead('contact', {
    name,
    email,
    phone: String(data.phone ?? '').trim(),
    message,
  })

  return NextResponse.json({ ok: true })
}
