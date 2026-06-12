import { NextRequest, NextResponse } from 'next/server'
import { locales, defaultLocale } from './lib/i18n'

// Añade el prefijo de idioma a las rutas que no lo llevan.
// Para "/" intenta detectar el idioma del navegador (es por defecto).

function detectLocale(request: NextRequest): string {
  const accept = request.headers.get('accept-language')
  if (accept) {
    const preferred = accept.split(',')[0]?.trim().slice(0, 2).toLowerCase()
    if (preferred && (locales as readonly string[]).includes(preferred)) {
      return preferred
    }
  }
  return defaultLocale
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const hasLocale = locales.some(
    (loc) => pathname === `/${loc}` || pathname.startsWith(`/${loc}/`),
  )
  if (hasLocale) return NextResponse.next()

  const locale = pathname === '/' ? detectLocale(request) : defaultLocale
  const url = request.nextUrl.clone()
  url.pathname = `/${locale}${pathname === '/' ? '' : pathname}`
  return NextResponse.redirect(url)
}

export const config = {
  // Excluye API, assets de Next, sitemap/robots y cualquier archivo con extensión
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\..*).*)'],
}
