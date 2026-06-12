// Configuración de internacionalización (ES por defecto, EN secundario)

export const locales = ['es', 'en'] as const
export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'es'

export const localeNames: Record<Locale, string> = {
  es: 'Español',
  en: 'English',
}

// Código de idioma para los atributos hreflang / og:locale
export const ogLocale: Record<Locale, string> = {
  es: 'es_ES',
  en: 'en_GB',
}

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value)
}

// Texto bilingüe simple
export type LocalizedText = Record<Locale, string>

export function t(text: LocalizedText, locale: Locale): string {
  return text[locale]
}
