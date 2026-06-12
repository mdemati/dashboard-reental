'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import type { Dictionary } from '@/lib/dictionary'

// Banner de cookies conforme RGPD: no carga scripts hasta consentimiento.
// Guarda la decisión en localStorage. (Conectar aquí carga de analítica al aceptar.)

const STORAGE_KEY = 'amapola-cookie-consent'

export default function CookieBanner({ dict, cookiesHref }: { dict: Dictionary; cookiesHref: string }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (!stored) setVisible(true)
    } catch {
      setVisible(true)
    }
  }, [])

  function decide(value: 'accepted' | 'rejected') {
    try {
      localStorage.setItem(STORAGE_KEY, value)
    } catch {
      /* almacenamiento no disponible */
    }
    setVisible(false)
    // Al aceptar: aquí se inicializaría la analítica (p.ej. window.gtag…)
  }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookies"
      className="fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-3xl rounded-xl2 border border-clay-200 bg-cream/98 p-5 shadow-lg backdrop-blur sm:inset-x-6 sm:p-6"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-charcoal/80">
          {dict.cookies.text}{' '}
          <Link href={cookiesHref} className="link-underline">
            {dict.cookies.more}
          </Link>
        </p>
        <div className="flex shrink-0 gap-2">
          <button type="button" onClick={() => decide('rejected')} className="btn-secondary px-5 py-2.5">
            {dict.cookies.reject}
          </button>
          <button type="button" onClick={() => decide('accepted')} className="btn-primary px-5 py-2.5">
            {dict.cookies.accept}
          </button>
        </div>
      </div>
    </div>
  )
}
