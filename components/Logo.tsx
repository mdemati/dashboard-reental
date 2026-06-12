import Link from 'next/link'

// Wordmark tipográfico de Amapola (sustituible por el logo real del cliente).
// La flor de amapola se sugiere con un punto en terracota.

export default function Logo({ href, className = '' }: { href: string; className?: string }) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-baseline gap-1 font-serif text-2xl font-semibold leading-none tracking-tight text-charcoal ${className}`}
      aria-label="Amapola Menorca — Inicio"
    >
      <span>Amapola</span>
      <span aria-hidden="true" className="inline-block h-2 w-2 translate-y-[-2px] rounded-full bg-terracotta transition-transform duration-300 group-hover:scale-125" />
      <span className="text-base font-normal tracking-[0.2em] text-clay-600">MENORCA</span>
    </Link>
  )
}
