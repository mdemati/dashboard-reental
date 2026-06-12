'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { Locale } from '@/lib/i18n'
import { href as buildHref, mainNav } from '@/lib/routes'
import type { Dictionary } from '@/lib/dictionary'
import { site } from '@/lib/site'
import Logo from './Logo'
import LanguageToggle from './LanguageToggle'
import { MenuIcon, CloseIcon, PhoneIcon } from './Icons'

export default function Header({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  // Sombra/fondo sólido al hacer scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Cierra el menú móvil al navegar
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  // Bloquea el scroll del body con el menú abierto
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const homeHref = buildHref(lang, 'home')

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled || open ? 'bg-cream/95 shadow-sm backdrop-blur' : 'bg-cream/70 backdrop-blur'
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-full focus:bg-terracotta focus:px-4 focus:py-2 focus:text-sm focus:text-cream"
      >
        {dict.nav.skipToContent}
      </a>

      <div className="container-amapola flex h-16 items-center justify-between gap-4 lg:h-20">
        <Logo href={homeHref} />

        {/* Navegación escritorio */}
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Principal">
          {mainNav.map(({ key, label }) => {
            const url = buildHref(lang, key)
            const active = pathname === url || pathname.startsWith(url + '/')
            return (
              <Link
                key={key}
                href={url}
                className={`text-sm font-medium transition-colors hover:text-terracotta ${
                  active ? 'text-terracotta' : 'text-charcoal/80'
                }`}
              >
                {dict.nav[label]}
              </Link>
            )
          })}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <LanguageToggle current={lang} />
          <a href={`tel:${site.phone.tel}`} className="btn-primary">
            <PhoneIcon className="h-4 w-4" />
            {site.phone.display}
          </a>
        </div>

        {/* Acciones móvil */}
        <div className="flex items-center gap-3 lg:hidden">
          <LanguageToggle current={lang} />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? dict.nav.closeMenu : dict.nav.openMenu}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-charcoal hover:bg-clay-100"
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Menú móvil */}
      {open && (
        <nav
          id="mobile-menu"
          className="container-amapola border-t border-clay-100 pb-6 pt-2 lg:hidden"
          aria-label="Principal móvil"
        >
          <ul className="flex flex-col">
            {mainNav.map(({ key, label }) => (
              <li key={key}>
                <Link
                  href={buildHref(lang, key)}
                  className="block border-b border-clay-100 py-3 font-serif text-lg text-charcoal"
                >
                  {dict.nav[label]}
                </Link>
              </li>
            ))}
          </ul>
          <a href={`tel:${site.phone.tel}`} className="btn-primary mt-5 w-full">
            <PhoneIcon className="h-4 w-4" />
            {site.phone.display}
          </a>
        </nav>
      )}
    </header>
  )
}
