// Generadores de datos estructurados (schema.org / JSON-LD).

import { site } from './site'
import { menuSections } from './menu'
import type { Locale } from './i18n'

const ORG_ID = `${site.url}/#business`

function postalAddress() {
  return {
    '@type': 'PostalAddress',
    streetAddress: site.address.street,
    addressLocality: site.address.locality,
    addressRegion: site.address.region,
    postalCode: site.address.postalCode,
    addressCountry: site.address.country,
  }
}

// LocalBusiness: panadería + cafetería
export function localBusinessSchema(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': ['Bakery', 'CafeOrCoffeeShop'],
    '@id': ORG_ID,
    name: site.name,
    legalName: site.legalName,
    url: `${site.url}/${locale}`,
    telephone: site.phone.tel,
    email: site.email,
    founder: { '@type': 'Person', name: site.founder },
    foundingDate: String(site.sourdoughYear),
    priceRange: '€€',
    servesCuisine: ['Bakery', 'Brunch', 'Coffee'],
    currenciesAccepted: 'EUR',
    image: `${site.url}/og/home.jpg`,
    address: postalAddress(),
    geo: {
      '@type': 'GeoCoordinates',
      latitude: site.geo.latitude,
      longitude: site.geo.longitude,
    },
    hasMap: site.maps.directions,
    sameAs: [site.social.instagram],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: site.hours.opens,
        closes: site.hours.closes,
      },
    ],
    areaServed: { '@type': 'AdministrativeArea', name: 'Menorca' },
  }
}

// Carta completa
export function menuSchema(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Menu',
    name: locale === 'es' ? 'Carta de Amapola Menorca' : 'Amapola Menorca menu',
    inLanguage: locale,
    provider: { '@id': ORG_ID },
    hasMenuSection: menuSections.map((section) => ({
      '@type': 'MenuSection',
      name: section.title[locale],
      hasMenuItem: section.items.map((item) => {
        const price =
          item.price ?? (item.variants && item.variants[0] ? item.variants[0].price : undefined)
        return {
          '@type': 'MenuItem',
          name: item.name[locale],
          ...(price
            ? {
                offers: {
                  '@type': 'Offer',
                  price: price.replace('€', '').replace(',', '.').trim(),
                  priceCurrency: 'EUR',
                },
              }
            : {}),
        }
      }),
    })),
  }
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

export function faqSchema(items: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  }
}

export function websiteSchema(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: site.name,
    url: `${site.url}/${locale}`,
    inLanguage: locale,
    publisher: { '@id': ORG_ID },
  }
}
