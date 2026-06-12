import { site } from '@/lib/site'
import { PinIcon, ArrowRightIcon } from './Icons'

// Google Maps embebido (sin API key) + botón "Cómo llegar" que abre la app nativa.
// loading="lazy" para no penalizar el LCP.

export default function MapEmbed({ directionsLabel, title }: { directionsLabel: string; title: string }) {
  return (
    <div className="overflow-hidden rounded-xl2 ring-1 ring-clay-100">
      <iframe
        title={title}
        src={site.maps.embed}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="h-72 w-full border-0 sm:h-80"
      />
      <a
        href={site.maps.directions}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-between gap-2 bg-cream px-5 py-4 text-sm font-semibold text-charcoal transition-colors hover:bg-clay-50"
      >
        <span className="inline-flex items-center gap-2">
          <PinIcon className="h-4 w-4 text-clay-600" />
          {directionsLabel}
        </span>
        <ArrowRightIcon className="h-4 w-4 text-terracotta" />
      </a>
    </div>
  )
}
