import type { Locale } from './i18n'

// Slugs de ruta (consistentes entre idiomas, con prefijo de idioma).
export const routes = {
  home: '',
  carta: '/carta',
  pan: '/pan',
  b2b: '/b2b',
  nosotros: '/nosotros',
  contacto: '/contacto',
  cookies: '/cookies',
} as const

export type RouteKey = keyof typeof routes

export function href(locale: Locale, key: RouteKey): string {
  return `/${locale}${routes[key]}`
}

// Orden de la navegación principal
export const mainNav: { key: RouteKey; label: keyof import('./dictionary').Dictionary['nav'] }[] = [
  { key: 'carta', label: 'carta' },
  { key: 'pan', label: 'pan' },
  { key: 'b2b', label: 'b2b' },
  { key: 'nosotros', label: 'nosotros' },
  { key: 'contacto', label: 'contacto' },
]
