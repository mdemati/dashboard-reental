import type { Metadata } from 'next'
import Link from 'next/link'
import type { Locale } from '@/lib/i18n'
import { getDictionary } from '@/lib/dictionary'
import { buildMetadata } from '@/lib/seo'
import { href as buildHref } from '@/lib/routes'
import { menuHighlights } from '@/lib/menu'
import { site } from '@/lib/site'

import Hero from '@/components/Hero'
import TrustStrip from '@/components/TrustStrip'
import SectionHeading from '@/components/SectionHeading'
import Figure from '@/components/Figure'
import DishCard from '@/components/DishCard'
import BreadCard from '@/components/BreadCard'
import Gallery from '@/components/Gallery'
import MapEmbed from '@/components/MapEmbed'
import { ArrowRightIcon, ClockIcon, PinIcon, PhoneIcon } from '@/components/Icons'

export function generateMetadata({ params }: { params: { lang: Locale } }): Metadata {
  const d = getDictionary(params.lang)
  return buildMetadata({
    locale: params.lang,
    routeKey: 'home',
    title: d.home.metaTitle,
    description: d.home.metaDescription,
  })
}

export default function HomePage({ params }: { params: { lang: Locale } }) {
  const lang = params.lang
  const d = getDictionary(lang)

  return (
    <>
      {/* SECCIÓN 1 — HERO */}
      <Hero
        headline={d.home.hero.headline}
        subheadline={d.home.hero.subheadline}
        ctaPrimary={d.home.hero.ctaPrimary}
        ctaPrimaryHref={buildHref(lang, 'carta')}
        ctaSecondary={d.home.hero.ctaSecondary}
        ctaSecondaryHref={buildHref(lang, 'b2b')}
        hours={d.common.hoursShort}
        photoLabel={`${d.common.photoPending} — hero`}
      />

      {/* SECCIÓN 2 — STRIP DE CONFIANZA */}
      <TrustStrip items={d.home.trust.items} title={d.home.trust.title} />

      {/* SECCIÓN 3 — QUIÉNES SOMOS */}
      <section className="container-amapola grid items-center gap-10 py-20 lg:grid-cols-2 lg:gap-16">
        <Figure
          alt={`${site.founder} — ${d.home.about.title}`}
          ratio="4/5"
          placeholderLabel={`${d.common.photoPending} — Elena en el obrador`}
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
        <div>
          <SectionHeading eyebrow={d.home.about.eyebrow} title={d.home.about.title} />
          <p className="mt-5 text-lg text-charcoal/75">{d.home.about.body}</p>
          <Link href={buildHref(lang, 'nosotros')} className="link-underline mt-6">
            {d.home.about.link}
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* SECCIÓN 4 — DESTACADOS DE CARTA */}
      <section className="bg-clay-50 py-20">
        <div className="container-amapola">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading eyebrow={d.home.highlights.eyebrow} title={d.home.highlights.title} />
            <Link href={buildHref(lang, 'carta')} className="link-underline">
              {d.home.highlights.cta}
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {menuHighlights.map((item) => (
              <DishCard
                key={item.name.es}
                name={item.name[lang]}
                price={item.price}
                photoLabel={`${d.common.photoPending}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* SECCIÓN 5 — NUESTRO PAN */}
      <section className="container-amapola py-20">
        <SectionHeading eyebrow={d.home.bread.eyebrow} title={d.home.bread.title} intro={d.home.bread.diff} />
        <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {d.home.bread.items.map((item) => (
            <BreadCard
              key={item.name}
              name={item.name}
              desc={item.desc}
              photoLabel={`${d.common.photoPending}`}
            />
          ))}
        </div>
        <div className="mt-10">
          <Link href={buildHref(lang, 'contacto')} className="btn-primary">
            {d.home.bread.cta}
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* SECCIÓN 6 — HORARIO Y UBICACIÓN */}
      <section className="bg-sage-100/50 py-20">
        <div className="container-amapola grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading eyebrow={d.home.location.eyebrow} title={d.home.location.title} />
            <ul className="mt-8 space-y-5 text-charcoal/80">
              <li className="flex gap-3">
                <ClockIcon className="mt-0.5 h-5 w-5 shrink-0 text-clay-600" />
                <span>{d.common.hoursLong}</span>
              </li>
              <li className="flex gap-3">
                <PinIcon className="mt-0.5 h-5 w-5 shrink-0 text-clay-600" />
                <span>
                  {d.common.address}
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
            </ul>
          </div>
          <MapEmbed directionsLabel={d.common.directions} title={`${site.name} — ${d.home.location.title}`} />
        </div>
      </section>

      {/* SECCIÓN 7 — GALERÍA */}
      <section className="container-amapola py-20">
        <SectionHeading eyebrow={d.home.gallery.eyebrow} title={d.home.gallery.title} center />
        <div className="mt-10">
          <Gallery count={8} photoLabel={d.common.photoPending} />
        </div>
      </section>

      {/* SECCIÓN 8 — B2B TEASER */}
      <section className="bg-clay-500 text-cream">
        <div className="container-amapola grid items-center gap-8 py-16 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <h2 className="text-balance font-serif text-3xl font-semibold sm:text-4xl">
              {d.home.b2bTeaser.title}
            </h2>
            <p className="mt-4 max-w-xl text-cream/90">{d.home.b2bTeaser.body}</p>
          </div>
          <div className="lg:justify-self-end">
            <Link
              href={buildHref(lang, 'b2b')}
              className="btn inline-flex bg-cream text-charcoal hover:bg-white"
            >
              {d.home.b2bTeaser.cta}
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
