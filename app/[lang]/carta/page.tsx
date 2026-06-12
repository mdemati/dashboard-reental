import type { Metadata } from 'next'
import Link from 'next/link'
import type { Locale } from '@/lib/i18n'
import { getDictionary } from '@/lib/dictionary'
import { buildMetadata } from '@/lib/seo'
import { href as buildHref } from '@/lib/routes'
import { menuSections, menuNote } from '@/lib/menu'
import { site } from '@/lib/site'
import { menuSchema, breadcrumbSchema } from '@/lib/schema'

import Breadcrumbs from '@/components/Breadcrumbs'
import JsonLd from '@/components/JsonLd'
import { SproutIcon } from '@/components/Icons'

export function generateMetadata({ params }: { params: { lang: Locale } }): Metadata {
  const d = getDictionary(params.lang)
  return buildMetadata({
    locale: params.lang,
    routeKey: 'carta',
    title: d.carta.metaTitle,
    description: d.carta.metaDescription,
  })
}

export default function CartaPage({ params }: { params: { lang: Locale } }) {
  const lang = params.lang
  const d = getDictionary(lang)

  const breadcrumbs = [
    { name: d.nav.home, href: buildHref(lang, 'home') },
    { name: d.nav.carta, href: buildHref(lang, 'carta') },
  ]

  return (
    <>
      <JsonLd
        data={[
          menuSchema(lang),
          breadcrumbSchema(breadcrumbs.map((b) => ({ name: b.name, url: `${site.url}${b.href}` }))),
        ]}
      />

      <Breadcrumbs items={breadcrumbs} />

      <div className="container-amapola py-10 sm:py-14">
        <header className="max-w-2xl">
          <h1 className="text-balance font-serif text-4xl font-semibold leading-tight text-charcoal sm:text-5xl">
            {d.carta.title}
          </h1>
          <p className="mt-4 text-lg text-charcoal/70">{d.carta.intro}</p>
          <p className="mt-3 text-sm text-charcoal/55">{d.carta.glutenFreeNote}</p>
        </header>

        {/* Índice de secciones (anclas) */}
        <nav aria-label="Secciones de la carta" className="mt-8 flex flex-wrap gap-2">
          {menuSections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="rounded-full bg-clay-50 px-4 py-1.5 text-sm font-medium text-clay-700 ring-1 ring-clay-100 transition-colors hover:bg-clay-100"
            >
              {section.title[lang]}
            </a>
          ))}
        </nav>

        {/* Secciones de la carta */}
        <div className="mt-12 grid gap-x-14 gap-y-12 lg:grid-cols-2">
          {menuSections.map((section) => (
            <section key={section.id} id={section.id} className="scroll-mt-24">
              <h2 className="font-serif text-2xl font-semibold text-charcoal">{section.title[lang]}</h2>
              {section.note && <p className="mt-2 text-sm text-charcoal/55">{section.note[lang]}</p>}

              <ul className="mt-5 divide-y divide-clay-100">
                {section.items.map((item) => (
                  <li key={item.name.es} className="flex items-baseline justify-between gap-4 py-3">
                    <span className="text-charcoal/85">{item.name[lang]}</span>
                    <span className="shrink-0 font-semibold text-terracotta">
                      {item.price ??
                        item.variants
                          ?.map((v) => `${v.label[lang]} ${v.price}`)
                          .join(' · ')}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        {/* Nota de la masa madre */}
        <aside className="mt-14 flex items-start gap-4 rounded-xl2 bg-sage-100/60 p-6">
          <SproutIcon className="mt-0.5 h-6 w-6 shrink-0 text-sage-600" />
          <p className="text-charcoal/80">{menuNote[lang]}</p>
        </aside>

        <div className="mt-12">
          <Link href={buildHref(lang, 'contacto')} className="btn-secondary">
            {d.contacto.orderNote}
          </Link>
        </div>
      </div>
    </>
  )
}
