import Link from 'next/link'
import type { Locale } from '@/lib/i18n'
import { href as buildHref, mainNav } from '@/lib/routes'
import type { Dictionary } from '@/lib/dictionary'
import { site } from '@/lib/site'
import Logo from './Logo'
import { PhoneIcon, PinIcon, ClockIcon, InstagramIcon } from './Icons'

export default function Footer({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-20 border-t border-clay-100 bg-clay-50">
      <div className="container-amapola grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        {/* Marca */}
        <div className="sm:col-span-2 lg:col-span-1">
          <Logo href={buildHref(lang, 'home')} />
          <p className="mt-4 max-w-xs text-sm text-charcoal/70">{dict.footer.tagline}</p>
        </div>

        {/* Navegación */}
        <nav aria-label={dict.footer.nav}>
          <h2 className="eyebrow mb-4">{dict.footer.nav}</h2>
          <ul className="space-y-2 text-sm">
            {mainNav.map(({ key, label }) => (
              <li key={key}>
                <Link href={buildHref(lang, key)} className="text-charcoal/80 transition-colors hover:text-terracotta">
                  {dict.nav[label]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Visítanos */}
        <div>
          <h2 className="eyebrow mb-4">{dict.footer.visit}</h2>
          <ul className="space-y-3 text-sm text-charcoal/80">
            <li className="flex gap-2">
              <PinIcon className="mt-0.5 h-4 w-4 shrink-0 text-clay-600" />
              <a href={site.maps.directions} target="_blank" rel="noopener noreferrer" className="hover:text-terracotta">
                {dict.common.address}
              </a>
            </li>
            <li className="flex gap-2">
              <ClockIcon className="mt-0.5 h-4 w-4 shrink-0 text-clay-600" />
              <span>{dict.common.hoursLong}</span>
            </li>
            <li className="flex gap-2">
              <PhoneIcon className="mt-0.5 h-4 w-4 shrink-0 text-clay-600" />
              <a href={`tel:${site.phone.tel}`} className="hover:text-terracotta">
                {site.phone.display}
              </a>
            </li>
          </ul>
        </div>

        {/* Síguenos */}
        <div>
          <h2 className="eyebrow mb-4">{dict.footer.follow}</h2>
          <a
            href={site.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-charcoal/80 transition-colors hover:text-terracotta"
          >
            <InstagramIcon className="h-5 w-5 text-clay-600" />
            {site.social.instagramHandle}
          </a>
        </div>
      </div>

      <div className="border-t border-clay-100">
        <div className="container-amapola flex flex-col items-center justify-between gap-3 py-5 text-xs text-charcoal/60 sm:flex-row">
          <p>
            © {year} {site.name}. {dict.footer.rights}
          </p>
          <Link href={buildHref(lang, 'cookies')} className="hover:text-terracotta">
            {dict.footer.cookies}
          </Link>
        </div>
      </div>
    </footer>
  )
}
