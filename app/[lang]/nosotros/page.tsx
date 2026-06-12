import type { Metadata } from 'next'
import Link from 'next/link'
import type { Locale } from '@/lib/i18n'
import { getDictionary } from '@/lib/dictionary'
import { buildMetadata } from '@/lib/seo'
import { href as buildHref } from '@/lib/routes'
import { site } from '@/lib/site'
import { breadcrumbSchema } from '@/lib/schema'

import Breadcrumbs from '@/components/Breadcrumbs'
import JsonLd from '@/components/JsonLd'
import Figure from '@/components/Figure'
import { ArrowRightIcon } from '@/components/Icons'

export function generateMetadata({ params }: { params: { lang: Locale } }): Metadata {
  const d = getDictionary(params.lang)
  return buildMetadata({
    locale: params.lang,
    routeKey: 'nosotros',
    title: d.nosotros.metaTitle,
    description: d.nosotros.metaDescription,
  })
}

export default function NosotrosPage({ params }: { params: { lang: Locale } }) {
  const lang = params.lang
  const d = getDictionary(lang)

  const breadcrumbs = [
    { name: d.nav.home, href: buildHref(lang, 'home') },
    { name: d.nav.nosotros, href: buildHref(lang, 'nosotros') },
  ]

  return (
    <>
      <JsonLd
        data={breadcrumbSchema(breadcrumbs.map((b) => ({ name: b.name, url: `${site.url}${b.href}` })))}
      />

      <Breadcrumbs items={breadcrumbs} />

      <header className="container-amapola py-10 sm:py-14">
        <div className="max-w-3xl">
          <p className="eyebrow mb-3">{d.nav.nosotros}</p>
          <h1 className="text-balance font-serif text-4xl font-semibold leading-tight text-charcoal sm:text-5xl">
            {d.nosotros.h1}
          </h1>
          <p className="mt-5 text-lg text-charcoal/75">{d.nosotros.intro}</p>
        </div>
      </header>

      {/* Foto de equipo / Elena en el obrador */}
      <div className="container-amapola">
        <Figure
          alt={`${site.founder} — ${site.name}`}
          ratio="16/9"
          priority
          placeholderLabel={`${d.common.photoPending} — Elena / equipo en el obrador`}
          sizes="(max-width: 1200px) 100vw, 1200px"
        />
      </div>

      {/* Bloques de historia, alternando lado */}
      <div className="container-amapola py-16">
        <div className="mx-auto max-w-3xl space-y-12">
          {d.nosotros.blocks.map((block, i) => (
            <section key={block.title} className="relative pl-8">
              <span
                aria-hidden="true"
                className="absolute left-0 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-clay-400 text-xs font-semibold text-cream"
              >
                {i + 1}
              </span>
              <span aria-hidden="true" className="absolute left-[11px] top-8 h-[calc(100%-1rem)] w-px bg-clay-200 last:hidden" />
              <h2 className="font-serif text-2xl font-semibold text-charcoal">{block.title}</h2>
              <p className="mt-3 text-charcoal/75">{block.body}</p>
            </section>
          ))}
        </div>
      </div>

      {/* CTA */}
      <section className="bg-clay-50 py-16">
        <div className="container-amapola text-center">
          <h2 className="font-serif text-3xl font-semibold text-charcoal">{d.nosotros.cta.title}</h2>
          <p className="mx-auto mt-3 max-w-xl text-charcoal/70">{d.nosotros.cta.body}</p>
          <Link href={buildHref(lang, 'carta')} className="btn-primary mt-7">
            {d.nosotros.cta.button}
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  )
}
