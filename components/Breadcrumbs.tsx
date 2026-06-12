import Link from 'next/link'

// Migas de pan visuales. El schema BreadcrumbList se inyecta aparte (JsonLd).

export default function Breadcrumbs({ items }: { items: { name: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="container-amapola pt-6 text-sm text-charcoal/55">
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, i) => {
          const last = i === items.length - 1
          return (
            <li key={i} className="flex items-center gap-1.5">
              {item.href && !last ? (
                <Link href={item.href} className="hover:text-terracotta">
                  {item.name}
                </Link>
              ) : (
                <span aria-current={last ? 'page' : undefined} className={last ? 'text-charcoal/80' : ''}>
                  {item.name}
                </span>
              )}
              {!last && <span aria-hidden="true">/</span>}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
