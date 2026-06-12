import type { Metadata } from 'next'
import type { Locale } from '@/lib/i18n'
import { getDictionary } from '@/lib/dictionary'
import { buildMetadata } from '@/lib/seo'
import { href as buildHref } from '@/lib/routes'
import { site } from '@/lib/site'
import { breadcrumbSchema } from '@/lib/schema'

import Breadcrumbs from '@/components/Breadcrumbs'
import JsonLd from '@/components/JsonLd'
import MapEmbed from '@/components/MapEmbed'
import ContactForm from '@/components/ContactForm'
import { ClockIcon, PinIcon, PhoneIcon, InstagramIcon } from '@/components/Icons'

export function generateMetadata({ params }: { params: { lang: Locale } }): Metadata {
  const d = getDictionary(params.lang)
  return buildMetadata({
    locale: params.lang,
    routeKey: 'contacto',
    title: d.contacto.metaTitle,
    description: d.contacto.metaDescription,
  })
}

export default function ContactoPage({ params }: { params: { lang: Locale } }) {
  const lang = params.lang
  const d = getDictionary(lang)

  const breadcrumbs = [
    { name: d.nav.home, href: buildHref(lang, 'home') },
    { name: d.nav.contacto, href: buildHref(lang, 'contacto') },
  ]

  return (
    <>
      <JsonLd
        data={breadcrumbSchema(breadcrumbs.map((b) => ({ name: b.name, url: `${site.url}${b.href}` })))}
      />

      <Breadcrumbs items={breadcrumbs} />

      <header className="container-amapola py-10 sm:py-14">
        <h1 className="text-balance font-serif text-4xl font-semibold leading-tight text-charcoal sm:text-5xl">
          {d.contacto.h1}
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-charcoal/70">{d.contacto.intro}</p>
      </header>

      <div className="container-amapola grid gap-12 pb-16 lg:grid-cols-2 lg:gap-16">
        {/* Información + mapa */}
        <div>
          <h2 className="font-serif text-2xl font-semibold text-charcoal">{d.contacto.infoTitle}</h2>
          <ul className="mt-6 space-y-5 text-charcoal/80">
            <li className="flex gap-3">
              <ClockIcon className="mt-0.5 h-5 w-5 shrink-0 text-clay-600" />
              <span>{d.common.hoursLong}</span>
            </li>
            <li className="flex gap-3">
              <PinIcon className="mt-0.5 h-5 w-5 shrink-0 text-clay-600" />
              <span>
                {site.address.street}, {site.address.postalCode} {site.address.locality}, {site.address.region}
                <br />
                <span className="text-charcoal/55">{d.common.landmark}</span>
              </span>
            </li>
            <li className="flex gap-3">
              <PhoneIcon className="mt-0.5 h-5 w-5 shrink-0 text-clay-600" />
              <a href={`tel:${site.phone.tel}`} className="hover:text-terracotta">
                {site.phone.display}
              </a>
            </li>
            <li className="flex gap-3">
              <InstagramIcon className="mt-0.5 h-5 w-5 shrink-0 text-clay-600" />
              <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-terracotta">
                {site.social.instagramHandle}
              </a>
            </li>
          </ul>

          <div className="mt-8">
            <MapEmbed directionsLabel={d.common.directions} title={`${site.name} — ${d.contacto.h1}`} />
          </div>
        </div>

        {/* Formulario */}
        <div>
          <h2 className="font-serif text-2xl font-semibold text-charcoal">{d.contacto.formTitle}</h2>
          <p className="mt-3 rounded-lg bg-clay-50 px-4 py-3 text-sm text-charcoal/70">{d.contacto.orderNote}</p>
          <div className="mt-6">
            <ContactForm dict={d} />
          </div>
        </div>
      </div>
    </>
  )
}
