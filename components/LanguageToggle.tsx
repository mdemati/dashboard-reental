'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { locales, type Locale } from '@/lib/i18n'

// Toggle ES/EN. Mantiene la misma página al cambiar de idioma reemplazando
// únicamente el prefijo de idioma de la ruta actual.

export default function LanguageToggle({ current }: { current: Locale }) {
  const pathname = usePathname() || `/${current}`

  function swap(target: Locale): string {
    const parts = pathname.split('/')
    // parts[0] = "" , parts[1] = locale
    if ((locales as readonly string[]).includes(parts[1])) {
      parts[1] = target
      return parts.join('/') || `/${target}`
    }
    return `/${target}`
  }

  return (
    <div className="flex items-center gap-1 text-sm font-semibold" role="group" aria-label="Language / Idioma">
      {locales.map((loc, i) => (
        <span key={loc} className="flex items-center">
          {i > 0 && <span className="px-1 text-clay-300" aria-hidden="true">/</span>}
          {loc === current ? (
            <span className="text-charcoal" aria-current="true">
              {loc.toUpperCase()}
            </span>
          ) : (
            <Link
              href={swap(loc)}
              hrefLang={loc}
              className="text-clay-600 transition-colors hover:text-terracotta"
            >
              {loc.toUpperCase()}
            </Link>
          )}
        </span>
      ))}
    </div>
  )
}
