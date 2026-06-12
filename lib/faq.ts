import type { Locale } from './i18n'

export type Faq = { q: Record<Locale, string>; a: Record<Locale, string> }

export const breadFaqs: Faq[] = [
  {
    q: {
      es: '¿Qué es el pan de masa madre?',
      en: 'What is sourdough bread?',
    },
    a: {
      es: 'Es pan fermentado con un cultivo natural de levaduras y bacterias —nuestra masa madre Josefina— en lugar de levadura industrial. La fermentación lenta de 24 a 48 horas aporta sabor, aroma y mejor digestibilidad.',
      en: 'It is bread fermented with a natural culture of yeasts and bacteria —our sourdough Josefina— instead of industrial yeast. The slow 24 to 48-hour fermentation brings flavour, aroma and better digestibility.',
    },
  },
  {
    q: {
      es: '¿Cuánto dura el pan de masa madre?',
      en: 'How long does sourdough bread last?',
    },
    a: {
      es: 'Gracias a la acidez natural de la masa madre, nuestro pan se mantiene en buen estado hasta una semana, sin conservantes, frente al pan industrial que endurece el mismo día.',
      en: 'Thanks to the natural acidity of sourdough, our bread stays fresh for up to a week with no preservatives, unlike industrial bread that hardens the same day.',
    },
  },
  {
    q: {
      es: '¿El pan de masa madre es apto para celíacos?',
      en: 'Is sourdough bread suitable for coeliacs?',
    },
    a: {
      es: 'No. Nuestro pan contiene gluten y no es apto para personas celíacas. Eso sí, muchas personas con sensibilidad al gluten industrial lo toleran mejor por la fermentación lenta.',
      en: 'No. Our bread contains gluten and is not suitable for coeliacs. However, many people sensitive to industrial gluten tolerate it better thanks to the slow fermentation.',
    },
  },
  {
    q: {
      es: '¿Qué es el pan de xeixa?',
      en: 'What is xeixa bread?',
    },
    a: {
      es: 'La xeixa es una variedad de trigo autóctono de Baleares, no modificado genéticamente, que cultivamos en Menorca. Da un pan de sabor suave y muy característico de la isla.',
      en: 'Xeixa is a native Balearic wheat variety, non-GMO, grown in Menorca. It produces a bread with a mild flavour that is very characteristic of the island.',
    },
  },
  {
    q: {
      es: '¿Suministráis pan a restaurantes y hoteles?',
      en: 'Do you supply bread to restaurants and hotels?',
    },
    a: {
      es: 'Sí. Abastecemos a hoteles y restaurantes de Menorca con entregas regulares y variedades para carta y eventos. Escríbenos desde la página para restaurantes y hoteles.',
      en: 'Yes. We supply hotels and restaurants across Menorca with regular deliveries and varieties for menus and events. Get in touch via our restaurants & hotels page.',
    },
  },
]
