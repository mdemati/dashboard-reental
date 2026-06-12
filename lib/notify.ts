// Reenvío de leads de los formularios.
//
// Por defecto registra el lead en el log del servidor (visible en Vercel).
// Si se define LEADS_WEBHOOK_URL (p.ej. un webhook de email, Slack, n8n o
// Make), reenvía el lead allí. Así el sitio funciona sin configuración y se
// puede conectar a un servicio de email sin tocar el código del formulario.

export type LeadKind = 'contact' | 'b2b'

export async function forwardLead(kind: LeadKind, payload: Record<string, string>) {
  const entry = {
    kind,
    receivedAt: new Date().toISOString(),
    ...payload,
  }

  // Registro siempre (auditoría / fallback)
  console.log(`[lead:${kind}]`, JSON.stringify(entry))

  const webhook = process.env.LEADS_WEBHOOK_URL
  if (!webhook) return

  try {
    await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(entry),
    })
  } catch (err) {
    // No bloqueamos al usuario por un fallo del webhook
    console.error('[lead:webhook-error]', err)
  }
}
