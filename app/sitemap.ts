import type { MetadataRoute } from 'next'
import { site } from '@/lib/site'
import { locales } from '@/lib/i18n'
import { routes } from '@/lib/routes'

// Sitemap con todas las rutas en ambos idiomas y alternates hreflang.
export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []

  for (const key of Object.keys(routes) as (keyof typeof routes)[]) {
    const path = routes[key]
    for (const locale of locales) {
      const languages: Record<string, string> = {}
      for (const loc of locales) {
        languages[loc] = `${site.url}/${loc}${path}`
      }
      entries.push({
        url: `${site.url}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: key === 'carta' ? 'weekly' : 'monthly',
        priority: key === 'home' ? 1 : key === 'cookies' ? 0.2 : 0.8,
        alternates: { languages },
      })
    }
  }

  return entries
}
