// Datos de la carta — fuente única para /carta, destacados del home y schema Menu.
// Cada item tiene nombre bilingüe y precio. Los precios se muestran en EUR.

import type { Locale } from './i18n'

export type MenuItem = {
  name: Record<Locale, string>
  price?: string // p.ej. "5,00€". Opcional cuando hay variantes
  variants?: { label: Record<Locale, string>; price: string }[]
  tag?: Record<Locale, string> // etiqueta corta (p.ej. "sin gluten")
}

export type MenuSection = {
  id: string
  title: Record<Locale, string>
  note?: Record<Locale, string>
  items: MenuItem[]
}

export const menuSections: MenuSection[] = [
  {
    id: 'tostadas',
    title: { es: 'Tostadas', en: 'Toasts' },
    note: {
      es: 'En pan rústico de masa madre. Disponibles en pan de cereales o sin gluten (+1,00€). Ingrediente extra +1,00€.',
      en: 'On rustic sourdough. Available on multigrain or gluten-free bread (+€1.00). Extra topping +€1.00.',
    },
    items: [
      { name: { es: 'Hummus, escalivada y queso feta', en: 'Hummus, escalivada & feta cheese' }, price: '5,50€' },
      { name: { es: 'Crema de aguacate y tomates cherry', en: 'Avocado cream & cherry tomatoes' }, price: '5,00€' },
      { name: { es: 'Mantequilla y mermelada', en: 'Butter & jam' }, price: '2,50€' },
      { name: { es: 'Tomate, aceite de oliva y sal', en: 'Tomato, olive oil & salt' }, price: '2,50€' },
      { name: { es: 'Aceite de oliva y sal', en: 'Olive oil & salt' }, price: '2,00€' },
      { name: { es: 'Queso Mahón', en: 'Mahón cheese' }, price: '4,00€' },
      { name: { es: 'Jamón braseado', en: 'Braised ham' }, price: '4,00€' },
      { name: { es: 'Jamón ibérico', en: 'Iberian ham' }, price: '5,00€' },
      { name: { es: 'Sobrasada de porc negre con miel', en: 'Black-pig sobrasada with honey' }, price: '4,50€' },
      {
        name: {
          es: 'Salmón ahumado y queso crema con limón y hierbabuena',
          en: 'Smoked salmon & cream cheese with lemon and mint',
        },
        price: '5,00€',
      },
      {
        name: { es: 'Mortadela de pistacho, burrata y pesto', en: 'Pistachio mortadella, burrata & pesto' },
        price: '8,00€',
      },
      {
        name: {
          es: 'Tortilla de patata (con cebolla) con huevos de Binissaida des Barracons',
          en: 'Spanish potato omelette (with onion), Binissaida des Barracons eggs',
        },
        price: '7,00€',
      },
    ],
  },
  {
    id: 'focaccia',
    title: { es: 'Focaccia', en: 'Focaccia' },
    items: [
      { name: { es: 'Jamón ibérico, tomate y aceite de oliva', en: 'Iberian ham, tomato & olive oil' }, price: '6,50€' },
      { name: { es: 'Jamón braseado y queso de Mahón', en: 'Braised ham & Mahón cheese' }, price: '6,00€' },
      { name: { es: 'Ventresca de atún, piquillos y mahonesa', en: 'Tuna belly, piquillo peppers & mayo' }, price: '6,50€' },
    ],
  },
  {
    id: 'dulces',
    title: { es: 'Pastelería y dulces', en: 'Pastries & sweets' },
    items: [
      { name: { es: 'Tarta de zanahoria', en: 'Carrot cake' }, price: '5,00€' },
      { name: { es: 'Tarta de queso', en: 'Cheesecake' }, price: '5,00€' },
      { name: { es: 'Tarta de chocolate', en: 'Chocolate cake' }, price: '5,50€' },
      { name: { es: 'Croissant', en: 'Croissant' }, price: '2,50€' },
      { name: { es: 'Napolitana de chocolate', en: 'Chocolate pastry' }, price: '2,50€' },
      { name: { es: 'Ensaimada mini', en: 'Mini ensaimada' }, price: '1,50€' },
      { name: { es: 'Galletas', en: 'Cookies' }, price: '2,00€' },
      { name: { es: 'Bol de fruta con yogur y granola casera', en: 'Fruit bowl with yogurt & homemade granola' }, price: '6,00€' },
    ],
  },
  {
    id: 'almuerzos',
    title: { es: 'Almuerzos', en: 'Lunch menu' },
    note: {
      es: 'Menú de almuerzo a 16€. Carta del día disponible en el local — consúltanos las opciones de hoy.',
      en: 'Lunch set menu at €16. Daily dishes available in-store — ask us about today’s options.',
    },
    items: [
      { name: { es: 'Menú de almuerzo del día', en: 'Daily lunch set menu' }, price: '16,00€' },
    ],
  },
  {
    id: 'cafes',
    title: { es: 'Cafés', en: 'Coffee' },
    note: {
      es: 'Disponible con leche de avena, soja o sin lactosa.',
      en: 'Available with oat, soy or lactose-free milk.',
    },
    items: [
      { name: { es: 'Espresso', en: 'Espresso' }, price: '1,70€' },
      { name: { es: 'Doble espresso', en: 'Double espresso' }, price: '2,20€' },
      { name: { es: 'Cortado', en: 'Cortado' }, price: '2,20€' },
      { name: { es: 'Americano', en: 'Americano' }, price: '2,40€' },
      { name: { es: 'Café con leche', en: 'Café con leche' }, price: '2,30€' },
      { name: { es: 'Cappuccino', en: 'Cappuccino' }, price: '1,90€' },
      { name: { es: 'Latte', en: 'Latte' }, price: '2,50€' },
      { name: { es: 'Iced Latte', en: 'Iced latte' }, price: '2,80€' },
      { name: { es: 'Affogato', en: 'Affogato' }, price: '3,20€' },
      { name: { es: 'Frappuccino', en: 'Frappuccino' }, price: '3,40€' },
    ],
  },
  {
    id: 'not-coffee',
    title: { es: 'Not Coffee', en: 'Not Coffee' },
    items: [
      { name: { es: 'Cúrcuma latte', en: 'Turmeric latte' }, price: '3,10€' },
      { name: { es: 'Matcha latte', en: 'Matcha latte' }, price: '3,10€' },
      { name: { es: 'Chocolate caliente', en: 'Hot chocolate' }, price: '2,80€' },
      { name: { es: 'Menta poleo', en: 'Pennyroyal mint' }, price: '2,10€' },
      { name: { es: 'Rooibos bio', en: 'Organic rooibos' }, price: '2,10€' },
      { name: { es: 'Manzanilla', en: 'Camomile' }, price: '2,10€' },
      {
        name: {
          es: 'Tés: English Breakfast, Verde Sencha bio, Rojo Pu-erh Imperial',
          en: 'Teas: English Breakfast, Organic Sencha Green, Imperial Pu-erh Red',
        },
        price: '2,80€',
      },
    ],
  },
  {
    id: 'zumos',
    title: { es: 'Zumos naturales', en: 'Fresh juices' },
    items: [
      {
        name: { es: 'Naranja', en: 'Orange' },
        variants: [
          { label: { es: '200 ml', en: '200 ml' }, price: '2,80€' },
          { label: { es: '300 ml', en: '300 ml' }, price: '4,80€' },
        ],
      },
      {
        name: { es: 'Detox: pepino, manzana, limón y apio', en: 'Detox: cucumber, apple, lemon & celery' },
        variants: [
          { label: { es: '200 ml', en: '200 ml' }, price: '3,10€' },
          { label: { es: '300 ml', en: '300 ml' }, price: '4,80€' },
        ],
      },
      {
        name: { es: 'Amapola: naranja, piña, zanahoria y jengibre', en: 'Amapola: orange, pineapple, carrot & ginger' },
        variants: [
          { label: { es: '200 ml', en: '200 ml' }, price: '3,10€' },
          { label: { es: '300 ml', en: '300 ml' }, price: '4,80€' },
        ],
      },
    ],
  },
  {
    id: 'bebidas',
    title: { es: 'Otras bebidas', en: 'Other drinks' },
    items: [
      { name: { es: 'Agua', en: 'Still water' }, price: '2,00€' },
      { name: { es: 'Agua con gas', en: 'Sparkling water' }, price: '2,00€' },
      { name: { es: 'Refrescos', en: 'Soft drinks' }, price: '2,40€' },
      { name: { es: 'Kombucha Lightbrew Acerola + Ginger', en: 'Kombucha Lightbrew Acerola + Ginger' }, price: '4,50€' },
      { name: { es: 'Kombucha Lightbrew Cucumber + Coriander', en: 'Kombucha Lightbrew Cucumber + Coriander' }, price: '4,50€' },
      { name: { es: 'Tónica', en: 'Tonic water' }, price: '2,50€' },
      { name: { es: 'Cerveza Estrella Galicia (botella)', en: 'Estrella Galicia beer (bottle)' }, price: '3,20€' },
      { name: { es: 'Graham Pearce (botella)', en: 'Graham Pearce (bottle)' }, price: '3,60€' },
      { name: { es: 'Cerveza Heineken 0,0', en: 'Heineken 0.0 beer' }, price: '2,50€' },
      { name: { es: 'Cerveza sin gluten', en: 'Gluten-free beer' }, price: '3,20€' },
    ],
  },
  {
    id: 'cocteles',
    title: { es: 'Cócteles', en: 'Cocktails' },
    items: [
      { name: { es: 'Nuestro Bloody Mary', en: 'Our Bloody Mary' }, price: '8,00€' },
      { name: { es: 'Virgin Mary «Vuelve a la vida» (sin alcohol)', en: 'Virgin Mary “Vuelve a la vida” (alcohol-free)' }, price: '4,80€' },
      { name: { es: 'Mimosa (con Licor de Mandarina Biniarbolla)', en: 'Mimosa (with Biniarbolla mandarin liqueur)' }, price: '5,20€' },
    ],
  },
]

// Destacados de carta para el home (4 platos estrella)
export const menuHighlights: MenuItem[] = [
  { name: { es: 'Bol de fruta con yogur y granola casera', en: 'Fruit bowl with yogurt & homemade granola' }, price: '6,00€' },
  {
    name: {
      es: 'Tostada de salmón ahumado y queso crema con limón y hierbabuena',
      en: 'Smoked salmon & cream cheese toast with lemon and mint',
    },
    price: '5,00€',
  },
  { name: { es: 'Focaccia de jamón ibérico, tomate y aceite de oliva', en: 'Iberian ham, tomato & olive oil focaccia' }, price: '6,50€' },
  { name: { es: 'Tarta de zanahoria', en: 'Carrot cake' }, price: '5,00€' },
]

export const menuNote: Record<Locale, string> = {
  es: 'Todo nuestro pan se elabora mediante procesos de fermentación lenta y en todos ellos participa nuestra masa madre, Josefina, nacida en 2018 aquí en la isla.',
  en: 'All our bread is made through slow fermentation, always with our sourdough starter, Josefina, born in 2018 here on the island.',
}
