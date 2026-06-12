import type { Metadata } from 'next'
import type { Locale } from '@/lib/i18n'
import { getDictionary } from '@/lib/dictionary'
import { buildMetadata } from '@/lib/seo'
import { href as buildHref } from '@/lib/routes'
import { site } from '@/lib/site'
import { breadcrumbSchema } from '@/lib/schema'

import Breadcrumbs from '@/components/Breadcrumbs'
import JsonLd from '@/components/JsonLd'
import SectionHeading from '@/components/SectionHeading'
import Figure from '@/components/Figure'
import B2BForm from '@/components/B2BForm'
import { WheatIcon } from '@/components/Icons'

export function generateMetadata({ params }: { params: { lang: Locale } }): Metadata {
  const d = getDictionary(params.lang)
  return buildMetadata({
    locale: params.lang,
    routeKey: 'b2b',
    title: d.b2b.metaTitle,
    description: d.b2b.metaDescription,
  })
}

export default function B2BPage({ params }: { params: { lang: Locale } }) {
  const lang = params.lang
  const d = getDictionary(lang)

  const breadcrumbs = [
    { name: d.nav.home, href: buildHref(lang, 'home') },
    { name: d.nav.b2b, href: buildHref(lang, 'b2b') },
  ]

  return (
    <>
      <JsonLd
        data={breadcrumbSchema(breadcrumbs.map((b) => ({ name: b.name, url: `${site.url}${b.href}` })))}
      />

      <Breadcrumbs items={breadcrumbs} />

      {/* Hero B2B */}
      <section className="container-amapola grid items-center gap-10 py-10 sm:py-14 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="eyebrow mb-3">B2B · Menorca</p>
          <h1 className="text-balance font-serif text-4xl font-semibold leading-tight text-charcoal sm:text-5xl">
            {d.b2b.h1}
          </h1>
          <p className="mt-5 text-lg text-charcoal/75">{d.b2b.intro}</p>
          <a href="#form" className="btn-primary mt-7">
            {d.b2b.form.submit}
          </a>
        </div>
        <Figure
          alt={d.b2b.h1}
          ratio="4/3"
          placeholderLabel={`${d.common.photoPending} — obrador / reparto`}
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </section>

      {/* Propuesta de valor */}
      <section className="bg-clay-50 py-16">
        <div className="container-amapola">
          <SectionHeading title={d.b2b.value.title} />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {d.b2b.value.items.map((item) => (
              <div key={item.title} className="rounded-xl2 bg-cream p-6 ring-1 ring-clay-100">
                <h3 className="font-serif text-lg text-charcoal">{item.title}</h3>
                <p className="mt-2 text-sm text-charcoal/70">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Variedades */}
      <section className="container-amapola py-16">
        <SectionHeading title={d.b2b.varieties.title} />
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {d.b2b.varieties.items.map((item) => (
            <li key={item} className="flex items-center gap-3 rounded-lg bg-clay-50 px-4 py-3">
              <WheatIcon className="h-5 w-5 shrink-0 text-clay-600" />
              <span className="text-charcoal/85">{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Formulario */}
      <section id="form" className="bg-sage-100/50 py-16 scroll-mt-20">
        <div className="container-amapola max-w-2xl">
          <SectionHeading title={d.b2b.form.title} intro={d.b2b.form.subtitle} />
          <div className="mt-8 rounded-xl2 bg-cream p-6 ring-1 ring-clay-100 sm:p-8">
            <B2BForm dict={d} />
          </div>
        </div>
      </section>
    </>
  )
}
