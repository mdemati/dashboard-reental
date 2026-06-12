import type { Metadata } from 'next'
import { site } from './site'
import { locales, ogLocale, type Locale } from './i18n'
import { routes, type RouteKey } from './routes'

// Construye los metadatos de una página con canonical, hreflang (incl. x-default),
// y Open Graph completos.

export function buildMetadata({
  locale,
  routeKey,
  title,
  description,
  ogImage,
}: {
  locale: Locale
  routeKey: RouteKey
  title: string
  description: string
  ogImage?: string
}): Metadata {
  const path = routes[routeKey]
  const canonical = `${site.url}/${locale}${path}`

  // hreflang para cada idioma + x-default apuntando al idioma por defecto (es)
  const languages: Record<string, string> = {}
  for (const loc of locales) {
    languages[loc] = `${site.url}/${loc}${path}`
  }
  languages['x-default'] = `${site.url}/es${path}`

  const image = ogImage ?? `${site.url}/og/${routeKey}.jpg`

  return {
    title,
    description,
    alternates: {
      canonical,
      languages,
    },
    openGraph: {
      type: 'website',
      siteName: site.name,
      title,
      description,
      url: canonical,
      locale: ogLocale[locale],
      images: [{ url: image, width: 1200, height: 630, alt: site.name }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  }
}
