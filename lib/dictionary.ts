// Diccionario de textos del sitio. getDictionary(locale) devuelve el bloque
// completo de copys para ese idioma. La forma de ES define el tipo; EN la replica.

import type { Locale } from './i18n'

const es = {
  nav: {
    home: 'Inicio',
    carta: 'Carta',
    pan: 'Nuestro pan',
    b2b: 'Restaurantes y hoteles',
    nosotros: 'Nuestra historia',
    contacto: 'Contacto',
    skipToContent: 'Saltar al contenido',
    openMenu: 'Abrir menú',
    closeMenu: 'Cerrar menú',
  },
  common: {
    hoursShort: 'Abierto cada día · 9:00 – 16:00',
    hoursLong: 'Abierto cada día de 9:00 a 16:00 (cocina hasta 15:30 h)',
    address: 'Carrer Ruiz i Pablo, 95 · Es Castell · Menorca',
    landmark: 'Sobre el Moll de Cales Fonts',
    directions: 'Cómo llegar',
    call: 'Llamar',
    viewMenu: 'Ver la carta',
    fullMenu: 'Ver carta completa',
    b2bCta: 'Suministro a hoteles',
    instagram: 'Síguenos en Instagram',
    from: 'desde',
    photoPending: 'Foto del cliente',
  },
  home: {
    metaTitle: 'Amapola Menorca — Obrador de pan de masa madre & cafetería en Es Castell',
    metaDescription:
      'Pan de masa madre con fermentación lenta y harinas ecológicas en Es Castell, Menorca. Desayunos y brunch sobre el Moll de Cales Fonts. Abierto cada día de 9 a 16 h.',
    hero: {
      headline: 'Pan de verdad. Hecho aquí cada mañana.',
      subheadline: 'Obrador de masa madre · Desayunos y brunch · Es Castell, Menorca',
      ctaPrimary: 'Ver la carta',
      ctaSecondary: 'Suministro a hoteles',
    },
    trust: {
      title: 'Por qué nuestro pan es diferente',
      items: [
        'Masa madre desde 2018',
        'Harinas ecológicas certificadas',
        'Fermentación lenta 24–48 h',
        'Pan de xeixa autóctona de Menorca',
        'Sin aditivos ni conservantes',
      ],
    },
    about: {
      eyebrow: 'Quiénes somos',
      title: 'Pan con historia y con alma',
      body: 'En 2018 Elena Romeo creó a Josefina, nuestra masa madre, en un agroturismo de Sant Climent junto al chef Robert Sarrió. Durante la pandemia de 2020 abrió su primer obrador en Maó y, tras cerrarlo, reabrió en Es Castell en un local más grande. Hoy elaboramos cada mañana panes de fermentación lenta y abastecemos también a hoteles y restaurantes de la isla.',
      link: 'Conoce nuestra historia',
    },
    highlights: {
      eyebrow: 'De la carta',
      title: 'Nuestros imprescindibles',
      cta: 'Ver carta completa',
    },
    bread: {
      eyebrow: 'Nuestro pan',
      title: 'El pan que elaboramos',
      diff: 'Dura hasta una semana. Sin aditivos. Josefina lleva activa desde 2018.',
      cta: 'Pedir pan',
      items: [
        { name: 'Pan de xeixa', desc: 'Trigo autóctono de Baleares, cultivado en Menorca.' },
        { name: 'Pan rústico con centeno integral', desc: 'Miga densa y sabor profundo de fermentación lenta.' },
        { name: 'Pan multicereal', desc: 'Mezcla de harinas ecológicas sin pesticidas.' },
        { name: 'Especiales del día', desc: 'Maíz, pipas, chía u olivas según la jornada.' },
      ],
    },
    location: {
      eyebrow: 'Visítanos',
      title: 'Horario y ubicación',
    },
    gallery: {
      eyebrow: 'Galería',
      title: 'Un vistazo a Amapola',
    },
    b2bTeaser: {
      title: '¿Tienes un restaurante u hotel en Menorca?',
      body: 'Suministramos pan artesanal a establecimientos de Menorca. Entregas regulares, variedades para carta y eventos.',
      cta: 'Hablemos',
    },
  },
  carta: {
    metaTitle: 'Carta — Amapola Menorca | Desayunos, brunch y café en Es Castell',
    metaDescription:
      'Tostadas de masa madre, focaccias, pastelería casera, cafés de especialidad y zumos naturales. Consulta la carta completa de Amapola Menorca en Es Castell.',
    title: 'Nuestra carta',
    intro:
      'Desayunos, brunch y dulce a cualquier hora. Todo sobre nuestro pan de masa madre y con producto de la isla.',
    glutenFreeNote: 'Todas las tostadas se pueden pedir en pan de cereales o sin gluten (+1,00€).',
  },
  pan: {
    metaTitle: 'Pan de masa madre en Menorca — Obrador Amapola en Es Castell',
    metaDescription:
      'Pan de masa madre de fermentación lenta con harinas ecológicas y xeixa autóctona de Baleares. Dura hasta una semana, sin aditivos. Obrador Amapola en Es Castell, Menorca.',
    h1: 'Pan de masa madre en Menorca',
    intro:
      'En Amapola elaboramos pan vivo: fermentaciones lentas, harinas ecológicas y nuestra masa madre Josefina. Pan que sabe a Menorca y que dura hasta una semana.',
    josefina: {
      title: 'La historia de Josefina',
      body: 'Josefina nació en 2018 en un agroturismo de Sant Climent. Es un cultivo vivo de levaduras y bacterias que captura el carácter de la isla y que mantenemos activo día tras día. Cada hogaza que sale de nuestro horno lleva su huella: una fermentación que no se puede acelerar y que aporta sabor, aroma y digestibilidad.',
    },
    why: {
      title: 'Por qué el pan de masa madre es diferente',
      items: [
        { title: 'Fermentación lenta 24–48 h', desc: 'El tiempo predigiere parte de los almidones y desarrolla aromas que el pan industrial no alcanza.' },
        { title: 'Harinas ecológicas sin pesticidas', desc: 'Trabajamos con harinas certificadas y molidas con respeto por el grano.' },
        { title: 'Dura hasta una semana', desc: 'La acidez natural de la masa madre conserva el pan mucho más tiempo, sin conservantes.' },
        { title: 'Más digestivo y nutritivo', desc: 'La fermentación facilita la asimilación de nutrientes y suele sentar mejor.' },
        { title: 'Apto para sensibles al gluten industrial', desc: 'Muchas personas con sensibilidad al gluten industrial lo toleran mejor. No es apto para celíacos.' },
      ],
    },
    varieties: {
      title: 'Nuestras variedades',
      items: [
        { name: 'Pan de xeixa', desc: 'Trigo autóctono de Baleares, no modificado genéticamente y cultivado en Menorca.' },
        { name: 'Pan rústico con centeno integral', desc: 'Centeno integral para una miga densa y un sabor intenso.' },
        { name: 'Pan multicereal con harinas ecológicas', desc: 'Mezcla equilibrada de cereales y semillas ecológicas.' },
        { name: 'Especiales del día', desc: 'Panes de maíz, pipas, chía u olivas según la jornada.' },
      ],
    },
    cta: {
      title: '¿Quieres nuestro pan en tu mesa?',
      body: 'Llámanos o escríbenos y reservamos tu pan recién hecho.',
      button: 'Pedir pan',
    },
  },
  b2b: {
    metaTitle: 'Pan artesanal para restaurantes y hoteles en Menorca — Amapola',
    metaDescription:
      'Suministro de pan de masa madre para restaurantes, hoteles y catering en Menorca. Entregas regulares, variedades para carta y eventos. Elaborado esa misma mañana.',
    h1: 'Pan artesanal para tu restaurante u hotel en Menorca',
    intro:
      'Ya abastecemos a hoteles y restaurantes de Menorca con pan de masa madre elaborado esa misma mañana. Variedades para carta y eventos, con entregas regulares.',
    value: {
      title: 'Por qué trabajar con Amapola',
      items: [
        { title: 'Suministro regular', desc: 'Entregas constantes adaptadas al ritmo de tu establecimiento en Menorca.' },
        { title: 'Variedades para carta y eventos', desc: 'Desde panes individuales a formatos especiales para banquetes.' },
        { title: 'Elaborado esa misma mañana', desc: 'Horneado del día: tu pan llega con el sabor y la frescura del obrador.' },
        { title: 'Confianza de la hostelería local', desc: 'Ya nos eligen hoteles y restaurantes de la isla.' },
      ],
    },
    varieties: {
      title: 'Variedades disponibles para hostelería',
      items: [
        'Pan de xeixa autóctona',
        'Pan rústico con centeno integral',
        'Pan multicereal ecológico',
        'Panes especiales (maíz, pipas, chía, olivas)',
        'Focaccias y formatos para evento',
      ],
    },
    form: {
      title: 'Hablemos de tu suministro',
      subtitle: 'Cuéntanos qué necesitas y te preparamos una propuesta a medida.',
      business: 'Nombre del establecimiento',
      type: 'Tipo',
      typeOptions: ['Restaurante', 'Hotel', 'Catering', 'Otro'],
      contact: 'Nombre de contacto',
      phone: 'Teléfono',
      email: 'Email',
      message: 'Mensaje / necesidades',
      submit: 'Enviar solicitud',
      sending: 'Enviando…',
      success: '¡Gracias! Hemos recibido tu solicitud y te contactaremos muy pronto.',
      error: 'No hemos podido enviar el formulario. Llámanos al 644 124 905 o inténtalo de nuevo.',
    },
  },
  nosotros: {
    metaTitle: 'Nuestra historia — Amapola Menorca | Elena Romeo y la masa madre Josefina',
    metaDescription:
      'La historia de Amapola Menorca: Elena Romeo, el chef Robert Sarrió, la masa madre Josefina nacida en 2018 y el camino de Sant Climent a Maó y Es Castell.',
    h1: 'Pan con historia y con alma',
    intro: 'Detrás de cada hogaza hay una historia que empezó con un cultivo de masa madre y mucha paciencia.',
    blocks: [
      {
        title: 'El origen en Sant Climent',
        body: 'Todo empezó en un agroturismo de Sant Climent, donde Elena Romeo, fundadora de Amapola, comenzó a trabajar la fermentación junto al chef Robert Sarrió, de Sa Punta. De aquellos ensayos nació un proyecto que pondría el pan de masa madre en el centro.',
      },
      {
        title: 'Josefina, nuestra masa madre (2018)',
        body: 'En 2018 nació Josefina, la masa madre que da vida a todo lo que horneamos. Un cultivo vivo, criado en la isla, que cuidamos cada día y que aporta a nuestro pan su sabor, su aroma y su conservación natural.',
      },
      {
        title: 'La pandemia como punto de inflexión',
        body: 'Durante la pandemia de 2020, en pleno parón, Elena dio el salto y abrió su primer obrador en Maó. Fue un momento difícil que se convirtió en el verdadero arranque de Amapola.',
      },
      {
        title: 'De Maó a Es Castell',
        body: 'Tras cerrar el local de Maó, Amapola reabrió en Es Castell en un espacio más grande, sobre el Moll de Cales Fonts. Hoy es obrador y cafetería, y desde aquí abastecemos también a hoteles y restaurantes de Menorca.',
      },
    ],
    cta: {
      title: 'Ven a conocernos',
      body: 'Te esperamos cada día en Es Castell, sobre el Moll de Cales Fonts.',
      button: 'Ver carta',
    },
  },
  contacto: {
    metaTitle: 'Contacto — Amapola Menorca | Es Castell, Menorca',
    metaDescription:
      'Encuentra Amapola Menorca en Carrer Ruiz i Pablo, 95, Es Castell. Horario, teléfono, Instagram y mapa. Para encargos de tartas y focaccias, contáctanos con antelación.',
    h1: 'Contacto',
    intro: 'Estamos en Es Castell, sobre el Moll de Cales Fonts. Escríbenos o pásate a vernos.',
    infoTitle: 'Información',
    formTitle: 'Escríbenos',
    orderNote: 'Para encargos de tartas y focaccias, contáctanos con antelación.',
    form: {
      name: 'Nombre',
      email: 'Email',
      phone: 'Teléfono',
      message: 'Mensaje',
      submit: 'Enviar mensaje',
      sending: 'Enviando…',
      success: '¡Gracias por escribirnos! Te responderemos lo antes posible.',
      error: 'No hemos podido enviar el mensaje. Llámanos al 644 124 905 o inténtalo de nuevo.',
    },
  },
  footer: {
    tagline: 'Obrador de pan de masa madre & cafetería en Es Castell, Menorca.',
    nav: 'Navegación',
    visit: 'Visítanos',
    follow: 'Síguenos',
    cookies: 'Política de cookies',
    privacy: 'Privacidad',
    rights: 'Todos los derechos reservados.',
  },
  cookies: {
    text: 'Usamos cookies propias y de terceros para mejorar tu experiencia y analizar el tráfico. Puedes aceptarlas o rechazarlas.',
    accept: 'Aceptar',
    reject: 'Rechazar',
    more: 'Más información',
  },
  forms: {
    required: 'Este campo es obligatorio',
    invalidEmail: 'Introduce un email válido',
  },
}

const en: typeof es = {
  nav: {
    home: 'Home',
    carta: 'Menu',
    pan: 'Our bread',
    b2b: 'Restaurants & hotels',
    nosotros: 'Our story',
    contacto: 'Contact',
    skipToContent: 'Skip to content',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
  },
  common: {
    hoursShort: 'Open every day · 9:00 – 16:00',
    hoursLong: 'Open every day from 9:00 to 16:00 (kitchen until 15:30)',
    address: 'Carrer Ruiz i Pablo, 95 · Es Castell · Menorca',
    landmark: 'Overlooking the Moll de Cales Fonts',
    directions: 'Get directions',
    call: 'Call us',
    viewMenu: 'View the menu',
    fullMenu: 'View full menu',
    b2bCta: 'Supply to hotels',
    instagram: 'Follow us on Instagram',
    from: 'from',
    photoPending: 'Client photo',
  },
  home: {
    metaTitle: 'Amapola Menorca — Sourdough bakery & café in Es Castell',
    metaDescription:
      'Slow-fermented sourdough bread made with organic flours in Es Castell, Menorca. Breakfast and brunch overlooking the Moll de Cales Fonts. Open every day 9 to 16.',
    hero: {
      headline: 'Real bread. Baked here every morning.',
      subheadline: 'Sourdough bakery · Breakfast & brunch · Es Castell, Menorca',
      ctaPrimary: 'View the menu',
      ctaSecondary: 'Supply to hotels',
    },
    trust: {
      title: 'Why our bread is different',
      items: [
        'Sourdough since 2018',
        'Certified organic flours',
        'Slow fermentation 24–48 h',
        'Native Menorcan xeixa wheat',
        'No additives or preservatives',
      ],
    },
    about: {
      eyebrow: 'Who we are',
      title: 'Bread with history and soul',
      body: 'In 2018 Elena Romeo created Josefina, our sourdough starter, at an agritourism in Sant Climent together with chef Robert Sarrió. During the 2020 pandemic she opened her first bakery in Maó and, after closing it, reopened in Es Castell in a larger space. Today we bake slow-fermented breads every morning and also supply hotels and restaurants across the island.',
      link: 'Discover our story',
    },
    highlights: {
      eyebrow: 'From the menu',
      title: 'Our must-haves',
      cta: 'View full menu',
    },
    bread: {
      eyebrow: 'Our bread',
      title: 'The bread we bake',
      diff: 'Stays fresh for up to a week. No additives. Josefina has been alive since 2018.',
      cta: 'Order bread',
      items: [
        { name: 'Xeixa bread', desc: 'Native Balearic wheat, grown in Menorca.' },
        { name: 'Rustic wholegrain rye', desc: 'Dense crumb and deep slow-fermentation flavour.' },
        { name: 'Multigrain loaf', desc: 'A blend of pesticide-free organic flours.' },
        { name: 'Daily specials', desc: 'Corn, sunflower seeds, chia or olives depending on the day.' },
      ],
    },
    location: {
      eyebrow: 'Visit us',
      title: 'Opening hours & location',
    },
    gallery: {
      eyebrow: 'Gallery',
      title: 'A glimpse of Amapola',
    },
    b2bTeaser: {
      title: 'Do you run a restaurant or hotel in Menorca?',
      body: 'We supply artisan bread to establishments across Menorca. Regular deliveries, varieties for menus and events.',
      cta: 'Let’s talk',
    },
  },
  carta: {
    metaTitle: 'Menu — Amapola Menorca | Breakfast, brunch & coffee in Es Castell',
    metaDescription:
      'Sourdough toasts, focaccias, homemade pastries, specialty coffee and fresh juices. See the full menu of Amapola Menorca in Es Castell.',
    title: 'Our menu',
    intro: 'Breakfast, brunch and something sweet any time. All on our sourdough bread, with local island produce.',
    glutenFreeNote: 'All toasts can be ordered on multigrain or gluten-free bread (+€1.00).',
  },
  pan: {
    metaTitle: 'Sourdough bread in Menorca — Amapola bakery in Es Castell',
    metaDescription:
      'Slow-fermented sourdough made with organic flours and native Balearic xeixa wheat. Stays fresh up to a week, no additives. Amapola bakery in Es Castell, Menorca.',
    h1: 'Sourdough bread in Menorca',
    intro:
      'At Amapola we bake living bread: slow fermentations, organic flours and our sourdough starter Josefina. Bread that tastes of Menorca and stays fresh for up to a week.',
    josefina: {
      title: 'The story of Josefina',
      body: 'Josefina was born in 2018 at an agritourism in Sant Climent. She is a living culture of yeasts and bacteria that captures the character of the island, and we keep her active day after day. Every loaf that leaves our oven carries her mark: a fermentation that cannot be rushed and that brings flavour, aroma and digestibility.',
    },
    why: {
      title: 'Why sourdough is different',
      items: [
        { title: 'Slow fermentation 24–48 h', desc: 'Time pre-digests part of the starches and develops aromas industrial bread never reaches.' },
        { title: 'Pesticide-free organic flours', desc: 'We work with certified flours, milled with respect for the grain.' },
        { title: 'Stays fresh up to a week', desc: 'The natural acidity of sourdough preserves the bread far longer, with no preservatives.' },
        { title: 'More digestible and nutritious', desc: 'Fermentation aids nutrient absorption and tends to feel lighter.' },
        { title: 'Friendly to industrial-gluten sensitivity', desc: 'Many people sensitive to industrial gluten tolerate it better. Not suitable for coeliacs.' },
      ],
    },
    varieties: {
      title: 'Our varieties',
      items: [
        { name: 'Xeixa bread', desc: 'Native Balearic wheat, non-GMO and grown in Menorca.' },
        { name: 'Rustic wholegrain rye', desc: 'Wholegrain rye for a dense crumb and intense flavour.' },
        { name: 'Organic multigrain loaf', desc: 'A balanced blend of organic grains and seeds.' },
        { name: 'Daily specials', desc: 'Corn, sunflower seed, chia or olive breads depending on the day.' },
      ],
    },
    cta: {
      title: 'Want our bread on your table?',
      body: 'Call or write to us and we’ll set aside your freshly baked bread.',
      button: 'Order bread',
    },
  },
  b2b: {
    metaTitle: 'Artisan bread for restaurants and hotels in Menorca — Amapola',
    metaDescription:
      'Sourdough bread supply for restaurants, hotels and catering in Menorca. Regular deliveries, varieties for menus and events. Baked the same morning.',
    h1: 'Artisan bread for your restaurant or hotel in Menorca',
    intro:
      'We already supply hotels and restaurants across Menorca with sourdough bread baked that same morning. Varieties for menus and events, with regular deliveries.',
    value: {
      title: 'Why work with Amapola',
      items: [
        { title: 'Regular supply', desc: 'Consistent deliveries adapted to the pace of your business in Menorca.' },
        { title: 'Varieties for menus and events', desc: 'From individual loaves to special formats for banquets.' },
        { title: 'Baked the same morning', desc: 'Same-day baking: your bread arrives with the flavour and freshness of the bakery.' },
        { title: 'Trusted by local hospitality', desc: 'Hotels and restaurants on the island already choose us.' },
      ],
    },
    varieties: {
      title: 'Varieties available for hospitality',
      items: [
        'Native xeixa bread',
        'Rustic wholegrain rye',
        'Organic multigrain loaf',
        'Special breads (corn, seeds, chia, olives)',
        'Focaccias and event formats',
      ],
    },
    form: {
      title: 'Let’s talk about your supply',
      subtitle: 'Tell us what you need and we’ll prepare a tailored proposal.',
      business: 'Business name',
      type: 'Type',
      typeOptions: ['Restaurant', 'Hotel', 'Catering', 'Other'],
      contact: 'Contact name',
      phone: 'Phone',
      email: 'Email',
      message: 'Message / needs',
      submit: 'Send request',
      sending: 'Sending…',
      success: 'Thank you! We’ve received your request and will get in touch very soon.',
      error: 'We couldn’t send the form. Call us on +34 644 124 905 or try again.',
    },
  },
  nosotros: {
    metaTitle: 'Our story — Amapola Menorca | Elena Romeo and the Josefina sourdough',
    metaDescription:
      'The story of Amapola Menorca: Elena Romeo, chef Robert Sarrió, the Josefina sourdough born in 2018, and the journey from Sant Climent to Maó and Es Castell.',
    h1: 'Bread with history and soul',
    intro: 'Behind every loaf there is a story that began with a sourdough culture and a lot of patience.',
    blocks: [
      {
        title: 'The beginning in Sant Climent',
        body: 'It all started at an agritourism in Sant Climent, where Elena Romeo, founder of Amapola, began exploring fermentation together with chef Robert Sarrió of Sa Punta. Those early experiments grew into a project built around sourdough bread.',
      },
      {
        title: 'Josefina, our sourdough (2018)',
        body: 'In 2018 Josefina was born, the sourdough starter that gives life to everything we bake. A living culture raised on the island, which we nurture every day and which gives our bread its flavour, aroma and natural keeping qualities.',
      },
      {
        title: 'The pandemic as a turning point',
        body: 'During the 2020 pandemic, in the middle of the standstill, Elena took the leap and opened her first bakery in Maó. A hard moment that became the true start of Amapola.',
      },
      {
        title: 'From Maó to Es Castell',
        body: 'After closing the Maó premises, Amapola reopened in Es Castell in a larger space, overlooking the Moll de Cales Fonts. Today it is both bakery and café, and from here we also supply hotels and restaurants across Menorca.',
      },
    ],
    cta: {
      title: 'Come and meet us',
      body: 'We’re here every day in Es Castell, overlooking the Moll de Cales Fonts.',
      button: 'View menu',
    },
  },
  contacto: {
    metaTitle: 'Contact — Amapola Menorca | Es Castell, Menorca',
    metaDescription:
      'Find Amapola Menorca at Carrer Ruiz i Pablo, 95, Es Castell. Hours, phone, Instagram and map. For cake and focaccia orders, please contact us in advance.',
    h1: 'Contact',
    intro: 'We’re in Es Castell, overlooking the Moll de Cales Fonts. Write to us or drop by.',
    infoTitle: 'Information',
    formTitle: 'Write to us',
    orderNote: 'For cake and focaccia orders, please contact us in advance.',
    form: {
      name: 'Name',
      email: 'Email',
      phone: 'Phone',
      message: 'Message',
      submit: 'Send message',
      sending: 'Sending…',
      success: 'Thank you for writing! We’ll get back to you as soon as possible.',
      error: 'We couldn’t send the message. Call us on +34 644 124 905 or try again.',
    },
  },
  footer: {
    tagline: 'Sourdough bakery & café in Es Castell, Menorca.',
    nav: 'Navigation',
    visit: 'Visit us',
    follow: 'Follow us',
    cookies: 'Cookie policy',
    privacy: 'Privacy',
    rights: 'All rights reserved.',
  },
  cookies: {
    text: 'We use our own and third-party cookies to improve your experience and analyse traffic. You can accept or reject them.',
    accept: 'Accept',
    reject: 'Reject',
    more: 'Learn more',
  },
  forms: {
    required: 'This field is required',
    invalidEmail: 'Enter a valid email',
  },
}

const dictionaries = { es, en }

export type Dictionary = typeof es

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale]
}
