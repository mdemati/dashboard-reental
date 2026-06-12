# Amapola Menorca — Web

Sitio web bilingüe (ES/EN) del obrador de pan de masa madre y cafetería **Amapola Menorca**, en Es Castell (Menorca).

Obrador artesanal de masa madre + cafetería/brunch, con dos líneas de negocio: **B2C** (desayunos y brunch) y **B2B** (suministro de pan a hoteles y restaurantes de la isla).

---

## 1. Stack técnico (y por qué)

**Next.js 14 (App Router) + TypeScript + Tailwind CSS**, desplegado en **Vercel**.

| Opción | Veredicto |
|---|---|
| **Next.js (elegido)** | SSG con HTML estático por idioma → **LCP/CLS/INP excelentes**, control total de schema/hreflang/OG, bilingüe nativo, hosting gratuito en Vercel, formularios con API routes sin backend aparte. |
| Astro | Igual de bueno en rendimiento; se descarta solo porque el repositorio ya partía de Next y el equipo mantiene el ecosistema React. |
| Webflow / Framer | Rápidos de montar y editables por el cliente, pero límite en control fino de schema/hreflang y coste de suscripción mensual recurrente. |
| WordPress + Elementor | Potente para edición, pero más pesado (peor CWV por defecto), mantenimiento/seguridad y plugins. Sobredimensionado para una web de 6 páginas. |

**Conclusión:** para un negocio pequeño que prioriza **velocidad, SEO local y un coste de hosting casi nulo**, Next.js en Vercel es la mejor relación rendimiento/coste. Todo el contenido (incluida la carta) es HTML estático: **sin PDFs**.

> Edición de contenido por el cliente: los textos viven en `lib/dictionary.ts` y la carta en `lib/menu.ts` (un único archivo, fácil de actualizar). Si en el futuro el cliente quiere editar sin tocar código, se puede conectar un CMS headless (Sanity / Contentful) sin cambiar la arquitectura.

---

## 2. Arquitectura de información (sitemap)

```
/                         → redirige a /es (o /en según navegador)
/{lang}/                  Home
/{lang}/carta            Carta completa (HTML, anclas por sección)
/{lang}/pan              Nuestro pan (editorial + SEO + FAQ)
/{lang}/b2b              Restaurantes y hoteles (landing + formulario)
/{lang}/nosotros         Nuestra historia
/{lang}/contacto         Contacto (info + mapa + formulario)
/{lang}/cookies          Política de cookies (RGPD)

/sitemap.xml             Sitemap con alternates hreflang
/robots.txt
```

`{lang}` = `es` | `en`. Los slugs se mantienen iguales en ambos idiomas y el toggle ES/EN conserva la página actual.

---

## 3. Wireframes

### HOME (móvil → escritorio)

```
┌──────────────────────────────┐   Header sticky: Logo · Nav (desktop) ·
│ Logo        ES/EN   ☰         │   toggle ES/EN · botón teléfono.
├──────────────────────────────┤   En móvil: logo + toggle + hamburguesa.
│                              │
│        HERO (foto full)      │   1 · Foto a sangre (LCP, priority).
│   "Pan de verdad. Hecho      │       Headline serif + subhead.
│    aquí cada mañana."        │       CTA primario [Ver la carta]
│   [Ver la carta] [Hoteles]   │       CTA secundario [Suministro hoteles]
│   ⏱ Abierto cada día 9–16    │       Chip de horario.
├──────────────────────────────┤
│ ◍ ◍ ◍ ◍ ◍  strip confianza   │   2 · 5 señales con icono
├──────────────────────────────┤       (scroll-x en móvil, grid en desktop).
│ [foto]  Quiénes somos        │   3 · Foto Elena + texto + enlace historia.
├──────────────────────────────┤
│ Destacados  [ver carta →]    │   4 · Grid 2×2 (móvil) / 4 (desktop) de
│ [▢][▢][▢][▢] platos + precio │       platos estrella con foto y precio.
├──────────────────────────────┤
│ Nuestro pan                  │   5 · 4 tarjetas de pan + texto diferencia.
│ [▢][▢][▢][▢]  [Pedir pan]    │
├──────────────────────────────┤
│ Horario/Ubicación │ [ MAPA ] │   6 · Datos NAP + Google Maps embebido
│                   │ [Cómo→]  │       + botón "Cómo llegar".
├──────────────────────────────┤
│ Galería (masonry)            │   7 · 8 fotos, columnas CSS, sin lightbox.
├──────────────────────────────┤
│ ▓▓ B2B teaser (fondo tierra) │   8 · Bloque destacado + CTA [Hablemos].
├──────────────────────────────┤
│ Footer: logo·nav·NAP·IG·cookies  9 · Footer completo.
└──────────────────────────────┘
```

### CARTA

```
┌──────────────────────────────┐
│ Inicio / Carta               │   Breadcrumbs.
│ H1 "Nuestra carta" + intro   │   Toggle ES/EN en el header (global).
│ Nota sin gluten              │
│ [Tostadas][Focaccia][Café]…  │   Chips de anclaje a cada sección.
├──────────────────────────────┤
│ Tostadas                     │   Lista nombre ········· precio.
│  Hummus, escalivada… 5,50€   │   2 columnas en desktop, 1 en móvil.
│  Aguacate y cherry…  5,00€   │
│ Focaccia / Dulces / Cafés…   │
├──────────────────────────────┤
│ ❧ Nota masa madre Josefina   │   Aside destacado.
└──────────────────────────────┘
```

---

## 4. Componentes UI

`components/`: `Header` (nav + menú móvil + toggle), `Footer`, `LanguageToggle`, `Logo`, `Hero`, `TrustStrip`, `SectionHeading`, `DishCard`, `BreadCard`, `Gallery` (masonry), `MapEmbed`, `Breadcrumbs`, `ContactForm`, `B2BForm`, `CookieBanner` (RGPD), `JsonLd`, `Figure` (imagen con placeholder), `Icons` (SVG inline).

---

## 5. Fotografía (la aporta el cliente)

El sitio funciona ya con **placeholders elegantes**. Para colocar las fotos reales basta pasar `src`/`imageSrc` a los componentes (`Hero`, `Figure`, `DishCard`, `BreadCard`, `Gallery`). Sube los archivos a `public/images/`.

Fotos necesarias (ver `public/images/README.md`):

1. **Hero** — pan saliendo del horno con vapor **o** mesa de brunch con luz natural (horizontal, alta resolución). *Es el LCP.*
2. **Obrador** — Elena trabajando la masa.
3. **Producto** — panes sobre tabla de madera/mármol (xeixa, centeno, multicereal, especiales).
4. **Platos** — tostadas, focaccias, tartas.
5. **Bebidas** — cafés, zumos, cócteles.
6. **Espacio** — interior, ambiente, detalle.
7. **Exterior** — fachada / terraza.

Imágenes Open Graph (1200×630) por página en `public/og/` (`home.jpg`, `carta.jpg`, …).

---

## 6. SEO técnico

Implementado:

- ✅ **Schema.org JSON-LD**: `Bakery + CafeOrCoffeeShop` (LocalBusiness con NAP, horario, geo), `Menu`, `BreadcrumbList`, `FAQPage`, `WebSite`.
- ✅ **hreflang** `es` / `en` / `x-default` + **canonical** por página.
- ✅ **Open Graph** y Twitter Card completos por página (`lib/seo.ts`).
- ✅ **`<html lang>`** dinámico por idioma.
- ✅ **sitemap.xml** con alternates + **robots.txt**.
- ✅ **Core Web Vitals**: HTML estático (SSG), `next/font` con `display:swap`, imágenes `next/image` con `aspect-ratio` (sin CLS), Hero con `priority`, mapa `loading=lazy`, JS ~95 kB.
- ✅ **Móvil**: mobile-first, base ≥16px, teléfono `tel:` clicable, áreas táctiles amplias.
- ✅ **RGPD**: banner de cookies que no carga analítica sin consentimiento.

### Checklist pre-lanzamiento

- [ ] Sustituir placeholders por **fotos reales** (incluida la del Hero / LCP) e imágenes OG.
- [ ] Confirmar el **dominio** en `lib/site.ts` (`site.url`) y en Vercel.
- [ ] Verificar la dirección exacta en el **embed de Google Maps** y las coordenadas `geo`.
- [ ] Conectar `LEADS_WEBHOOK_URL` (email/Slack/n8n) para recibir los formularios.
- [ ] Validar el schema en [Rich Results Test](https://search.google.com/test/rich-results).
- [ ] Dar de alta y verificar **Google Search Console** + enviar `sitemap.xml`.
- [ ] Crear/optimizar **Google Business Profile** (NAP idéntico al del sitio).
- [ ] Revisar textos legales (cookies/privacidad) con asesoría.
- [ ] Test de **Lighthouse** móvil (objetivo: LCP < 2,5s · CLS < 0,1 · INP < 200ms).
- [ ] Comprobar que el almuerzo (menú 16€) se transcribe a texto cuando el cliente facilite los platos.

---

## 7. Desarrollo

```bash
npm install
npm run dev      # http://localhost:3000 → redirige a /es
npm run build    # build de producción (SSG)
```

Variables de entorno: ver `.env.local.example`.

### Estructura

```
app/
  [lang]/            layout raíz por idioma + páginas (home, carta, pan, b2b, nosotros, contacto, cookies)
  api/contact        endpoint formulario de contacto
  api/b2b            endpoint formulario B2B
  sitemap.ts · robots.ts
lib/                 i18n, diccionario de textos, carta, FAQ, schema, SEO, constantes del negocio
components/          UI
middleware.ts        prefijo de idioma en las rutas
```
