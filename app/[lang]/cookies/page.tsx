import type { Metadata } from 'next'
import type { Locale } from '@/lib/i18n'
import { getDictionary } from '@/lib/dictionary'
import { buildMetadata } from '@/lib/seo'
import { href as buildHref } from '@/lib/routes'
import { site } from '@/lib/site'
import Breadcrumbs from '@/components/Breadcrumbs'

export function generateMetadata({ params }: { params: { lang: Locale } }): Metadata {
  const isEs = params.lang === 'es'
  return buildMetadata({
    locale: params.lang,
    routeKey: 'cookies',
    title: isEs ? 'Política de cookies — Amapola Menorca' : 'Cookie policy — Amapola Menorca',
    description: isEs
      ? 'Información sobre el uso de cookies en amapolamenorca.com.'
      : 'Information about the use of cookies on amapolamenorca.com.',
  })
}

// Contenido legal básico, bilingüe. Revisar con asesoría antes del lanzamiento.
const copy = {
  es: {
    title: 'Política de cookies',
    intro:
      'Esta web utiliza cookies para garantizar su funcionamiento, recordar tus preferencias y analizar el tráfico de forma agregada. Al cargar el sitio no se activan cookies analíticas hasta que prestas tu consentimiento mediante el banner.',
    sections: [
      {
        h: '¿Qué son las cookies?',
        p: 'Son pequeños archivos que se descargan en tu dispositivo al visitar una web y que permiten recordar información sobre tu navegación.',
      },
      {
        h: 'Tipos de cookies que usamos',
        p: 'Cookies técnicas necesarias (idioma, consentimiento) y, solo si las aceptas, cookies analíticas para entender de forma anónima cómo se usa el sitio. No usamos cookies publicitarias.',
      },
      {
        h: 'Cómo gestionar las cookies',
        p: 'Puedes aceptar o rechazar las cookies no esenciales desde el banner. También puedes eliminarlas o bloquearlas desde la configuración de tu navegador.',
      },
      {
        h: 'Mapa de Google',
        p: 'Las páginas con mapa cargan un iframe de Google Maps, que puede instalar cookies propias de Google al interactuar con él.',
      },
    ],
    contact: 'Para cualquier duda sobre privacidad puedes escribirnos a',
  },
  en: {
    title: 'Cookie policy',
    intro:
      'This website uses cookies to ensure it works, remember your preferences and analyse traffic in aggregate. No analytics cookies are activated on load until you give consent via the banner.',
    sections: [
      {
        h: 'What are cookies?',
        p: 'They are small files downloaded to your device when you visit a website, allowing it to remember information about your browsing.',
      },
      {
        h: 'Types of cookies we use',
        p: 'Necessary technical cookies (language, consent) and, only if you accept them, analytics cookies to anonymously understand how the site is used. We do not use advertising cookies.',
      },
      {
        h: 'How to manage cookies',
        p: 'You can accept or reject non-essential cookies from the banner. You can also delete or block them from your browser settings.',
      },
      {
        h: 'Google Maps',
        p: 'Pages with a map load a Google Maps iframe, which may set Google’s own cookies when you interact with it.',
      },
    ],
    contact: 'For any privacy questions you can write to us at',
  },
} as const

export default function CookiesPage({ params }: { params: { lang: Locale } }) {
  const lang = params.lang
  const d = getDictionary(lang)
  const c = copy[lang]

  return (
    <>
      <Breadcrumbs
        items={[
          { name: d.nav.home, href: buildHref(lang, 'home') },
          { name: c.title, href: buildHref(lang, 'cookies') },
        ]}
      />
      <article className="container-amapola max-w-3xl py-10 sm:py-14">
        <h1 className="font-serif text-4xl font-semibold text-charcoal">{c.title}</h1>
        <p className="mt-5 text-charcoal/75">{c.intro}</p>
        <div className="mt-8 space-y-7">
          {c.sections.map((s) => (
            <section key={s.h}>
              <h2 className="font-serif text-xl font-semibold text-charcoal">{s.h}</h2>
              <p className="mt-2 text-charcoal/75">{s.p}</p>
            </section>
          ))}
        </div>
        <p className="mt-8 text-charcoal/75">
          {c.contact}{' '}
          <a href={`mailto:${site.email}`} className="link-underline">
            {site.email}
          </a>
          .
        </p>
      </article>
    </>
  )
}
