import { SproutIcon, LeafIcon, ClockIcon, WheatIcon, ShieldIcon } from './Icons'

// Strip de confianza: 5 señales de valor con icono. Scroll horizontal en móvil.

const icons = [SproutIcon, LeafIcon, ClockIcon, WheatIcon, ShieldIcon]

export default function TrustStrip({ items, title }: { items: string[]; title: string }) {
  return (
    <section aria-label={title} className="border-y border-clay-100 bg-clay-50">
      <h2 className="sr-only">{title}</h2>
      <ul className="container-amapola flex snap-x gap-6 overflow-x-auto py-6 sm:grid sm:grid-cols-3 sm:overflow-visible lg:grid-cols-5">
        {items.map((item, i) => {
          const Icon = icons[i % icons.length]
          return (
            <li
              key={item}
              className="flex min-w-[200px] shrink-0 snap-start items-center gap-3 sm:min-w-0"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cream text-clay-600 ring-1 ring-clay-200">
                <Icon className="h-5 w-5" />
              </span>
              <span className="text-sm font-medium text-charcoal/85">{item}</span>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
