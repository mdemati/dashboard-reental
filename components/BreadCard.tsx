import Figure from './Figure'

// Tarjeta de variedad de pan: foto + nombre + descripción.

export default function BreadCard({
  name,
  desc,
  photoLabel,
  imageSrc,
}: {
  name: string
  desc: string
  photoLabel: string
  imageSrc?: string
}) {
  return (
    <article className="flex flex-col overflow-hidden rounded-xl2 bg-cream ring-1 ring-clay-100">
      <Figure
        src={imageSrc}
        alt={name}
        ratio="1/1"
        rounded={false}
        placeholderLabel={photoLabel}
        sizes="(max-width: 640px) 50vw, 25vw"
      />
      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 className="font-serif text-lg text-charcoal">{name}</h3>
        <p className="text-sm text-charcoal/70">{desc}</p>
      </div>
    </article>
  )
}
