import type { Metadata } from 'next'
import Link from 'next/link'
import type { Locale } from '@/lib/i18n'
import { getDictionary } from '@/lib/dictionary'
import { buildMetadata } from '@/lib/seo'
import { href as buildHref } from '@/lib/routes'
import { site } from '@/lib/site'
import { breadFaqs } from '@/lib/faq'
import { breadcrumbSchema, faqSchema } from '@/lib/schema'

import Breadcrumbs from '@/components/Breadcrumbs'
import JsonLd from '@/components/JsonLd'
import Figure from '@/components/Figure'
import SectionHeading from '@/components/SectionHeading'
import BreadCard from '@/components/BreadCard'
import { ArrowRightIcon, ShieldIcon } from '@/components/Icons'

export function generateMetadata({ params }: { params: { lang: Locale } }): Metadata {
  const d = getDictionary(params.lang)
  return buildMetadata({
    locale: params.lang,
    routeKey: 'pan',
    title: d.pan.metaTitle,
    description: d.pan.metaDescription,
  })
}

export default function PanPage({ params }: { params: { lang: Locale } }) {
  const lang = params.lang
  const d = getDictionary(lang)

  const breadcrumbs = [
    { name: d.nav.home, href: buildHref(lang, 'home') },
    { name: d.nav.pan, href: buildHref(lang, 'pan') },
  ]

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(breadcrumbs.map((b) => ({ name: b.name, url: `${site.url}${b.href}` }))),
          faqSchema(breadFaqs.map((f) => ({ q: f.q[lang], a: f.a[lang] }))),
        ]}
      />

      <Breadcrumbs items={breadcrumbs} />

      {/* Intro */}
      <header className="container-amapola py-10 sm:py-14">
        <div className="max-w-3xl">
          <p className="eyebrow mb-3">{d.nav.pan}</p>
          <h1 className="text-balance font-serif text-4xl font-semibold leading-tight text-charcoal sm:text-5xl">
            {d.pan.h1}
          </h1>
          <p className="mt-5 text-lg text-charcoal/75">{d.pan.intro}</p>
        </div>
      </header>

      {/* Josefina */}
      <section className="container-amapola grid items-center gap-10 pb-16 lg:grid-cols-2 lg:gap-16">
        <Figure
          alt={d.pan.josefina.title}
          ratio="4/3"
          placeholderLabel={`${d.common.photoPending} — Josefina / masa madre`}
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
        <div>
          <h2 className="font-serif text-2xl font-semibold text-charcoal sm:text-3xl">
            {d.pan.josefina.title}
          </h2>
          <p className="mt-4 text-charcoal/75">{d.pan.josefina.body}</p>
        </div>
      </section>

      {/* Por qué es diferente */}
      <section className="bg-clay-50 py-16">
        <div className="container-amapola">
          <SectionHeading title={d.pan.why.title} />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {d.pan.why.items.map((item) => (
              <div key={item.title} className="rounded-xl2 bg-cream p-6 ring-1 ring-clay-100">
                <ShieldIcon className="h-6 w-6 text-sage-600" />
                <h3 className="mt-4 font-serif text-lg text-charcoal">{item.title}</h3>
                <p className="mt-2 text-sm text-charcoal/70">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Variedades */}
      <section className="container-amapola py-16">
        <SectionHeading title={d.pan.varieties.title} />
        <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {d.pan.varieties.items.map((item) => (
            <BreadCard
              key={item.name}
              name={item.name}
              desc={item.desc}
              photoLabel={d.common.photoPending}
            />
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-sage-100/50 py-16">
        <div className="container-amapola max-w-3xl">
          <SectionHeading title={lang === 'es' ? 'Preguntas frecuentes' : 'Frequently asked questions'} />
          <div className="mt-8 divide-y divide-clay-200">
            {breadFaqs.map((faq) => (
              <details key={faq.q.es} className="group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-serif text-lg text-charcoal">
                  {faq.q[lang]}
                  <span className="text-clay-600 transition-transform group-open:rotate-45" aria-hidden="true">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-charcoal/75">{faq.a[lang]}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-amapola py-16">
        <div className="rounded-xl2 bg-clay-500 px-8 py-12 text-center text-cream">
          <h2 className="font-serif text-3xl font-semibold">{d.pan.cta.title}</h2>
          <p className="mx-auto mt-3 max-w-xl text-cream/90">{d.pan.cta.body}</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <a href={`tel:${site.phone.tel}`} className="btn bg-cream text-charcoal hover:bg-white">
              {site.phone.display}
            </a>
            <Link href={buildHref(lang, 'contacto')} className="btn border border-cream/60 text-cream hover:bg-cream/10">
              {d.pan.cta.button}
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
