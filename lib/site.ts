// Constantes globales del negocio Amapola Menorca.
// Punto único de verdad para NAP (Name, Address, Phone), schema y enlaces.

export const site = {
  name: 'Amapola Menorca',
  legalName: 'Amapola Menorca — Obrador de pan & cafetería',
  // Dominio de producción (ajustar si cambia)
  url: 'https://amapolamenorca.com',
  founder: 'Elena Romeo',
  sourdoughName: 'Josefina',
  sourdoughYear: 2018,

  address: {
    street: 'Carrer Ruiz i Pablo, 95',
    locality: 'Es Castell',
    region: 'Menorca',
    postalCode: '07720',
    country: 'ES',
    // Referencia conocida por locales
    landmark: 'Sobre el Moll de Cales Fonts',
  },

  // Coordenadas aproximadas de Es Castell / Cales Fonts
  geo: {
    latitude: 39.8795,
    longitude: 4.2899,
  },

  phone: {
    display: '644 124 905',
    tel: '+34644124905',
  },

  email: 'hola@amapolamenorca.com',

  hours: {
    // Abierto cada día 9:00–16:00 (cocina hasta 15:30)
    opens: '09:00',
    closes: '16:00',
    kitchenCloses: '15:30',
  },

  social: {
    instagram: 'https://www.instagram.com/amapolamenorca/',
    instagramHandle: '@amapolamenorca',
  },

  maps: {
    // Embed sin necesidad de API key
    embed:
      'https://maps.google.com/maps?q=Carrer%20Ruiz%20i%20Pablo%2095%2C%20Es%20Castell%2C%20Menorca&t=&z=16&ie=UTF8&iwloc=&output=embed',
    // Abre la app nativa de Google Maps con indicaciones
    directions:
      'https://www.google.com/maps/dir/?api=1&destination=Carrer+Ruiz+i+Pablo+95+Es+Castell+Menorca',
  },
} as const

export type Site = typeof site
