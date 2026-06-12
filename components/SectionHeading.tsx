// Encabezado de sección reutilizable: eyebrow + título + intro opcional.

export default function SectionHeading({
  eyebrow,
  title,
  intro,
  center = false,
  as = 'h2',
}: {
  eyebrow?: string
  title: string
  intro?: string
  center?: boolean
  as?: 'h1' | 'h2'
}) {
  const Tag = as
  return (
    <div className={`max-w-2xl ${center ? 'mx-auto text-center' : ''}`}>
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <Tag className="text-balance font-serif text-3xl font-semibold leading-tight text-charcoal sm:text-4xl">
        {title}
      </Tag>
      {intro && <p className="mt-4 text-lg text-charcoal/70">{intro}</p>}
    </div>
  )
}
