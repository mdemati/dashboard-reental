import Link from 'next/link'
import Figure from './Figure'
import { ClockIcon, ArrowRightIcon } from './Icons'

// Hero a pantalla (casi) completa. La imagen es el LCP: cuando exista la foto
// real se pasa por `imageSrc` con priority para optimizar el LCP < 2.5s.

export default function Hero({
  headline,
  subheadline,
  ctaPrimary,
  ctaPrimaryHref,
  ctaSecondary,
  ctaSecondaryHref,
  hours,
  photoLabel,
  imageSrc,
}: {
  headline: string
  subheadline: string
  ctaPrimary: string
  ctaPrimaryHref: string
  ctaSecondary: string
  ctaSecondaryHref: string
  hours: string
  photoLabel: string
  imageSrc?: string
}) {
  return (
    <section className="relative">
      <div className="absolute inset-0">
        <Figure
          src={imageSrc}
          alt={headline}
          ratio="auto"
          rounded={false}
          priority
          placeholderLabel={photoLabel}
          sizes="100vw"
          className="h-full"
        />
        {/* Velado para legibilidad del texto sobre la foto */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/30 to-charcoal/20" />
      </div>

      <div className="container-amapola relative flex min-h-[78vh] flex-col justify-end pb-12 pt-24 sm:min-h-[82vh] sm:pb-16">
        <div className="max-w-2xl reveal">
          <h1 className="text-balance font-serif text-4xl font-semibold leading-[1.1] text-cream drop-shadow-sm sm:text-5xl lg:text-6xl">
            {headline}
          </h1>
          <p className="mt-5 max-w-xl text-lg text-cream/90 sm:text-xl">{subheadline}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href={ctaPrimaryHref} className="btn-primary">
              {ctaPrimary}
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
            <Link href={ctaSecondaryHref} className="btn-ghost">
              {ctaSecondary}
            </Link>
          </div>

          <p className="mt-8 inline-flex items-center gap-2 rounded-full bg-cream/15 px-4 py-2 text-sm font-medium text-cream ring-1 ring-cream/30 backdrop-blur">
            <ClockIcon className="h-4 w-4" />
            {hours}
          </p>
        </div>
      </div>
    </section>
  )
}
