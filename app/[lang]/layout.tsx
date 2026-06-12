import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import '../globals.css'
import { locales, isLocale, type Locale } from '@/lib/i18n'
import { getDictionary } from '@/lib/dictionary'
import { href as buildHref } from '@/lib/routes'
import { site } from '@/lib/site'
import { localBusinessSchema, websiteSchema } from '@/lib/schema'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CookieBanner from '@/components/CookieBanner'
import JsonLd from '@/components/JsonLd'
import { notFound } from 'next/navigation'

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
  weight: ['500', '600', '700'],
})

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Obrador de pan de masa madre & cafetería`,
    template: `%s | ${site.name}`,
  },
  applicationName: site.name,
  authors: [{ name: site.founder }],
  icons: { icon: '/favicon.svg' },
  robots: { index: true, follow: true },
}

export default function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { lang: string }
}) {
  if (!isLocale(params.lang)) notFound()
  const lang = params.lang as Locale
  const dict = getDictionary(lang)

  return (
    <html lang={lang} className={`${playfair.variable} ${inter.variable}`}>
      <body className="flex min-h-screen flex-col font-sans">
        <JsonLd data={[localBusinessSchema(lang), websiteSchema(lang)]} />
        <Header lang={lang} dict={dict} />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer lang={lang} dict={dict} />
        <CookieBanner dict={dict} cookiesHref={buildHref(lang, 'cookies')} />
      </body>
    </html>
  )
}
