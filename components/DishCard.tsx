import Figure from './Figure'

// Tarjeta de plato con foto, nombre y precio. Usada en destacados del home.

export default function DishCard({
  name,
  price,
  photoLabel,
  imageSrc,
}: {
  name: string
  price?: string
  photoLabel: string
  imageSrc?: string
}) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-xl2 bg-cream ring-1 ring-clay-100 transition-shadow duration-300 hover:shadow-md">
      <Figure
        src={imageSrc}
        alt={name}
        ratio="4/3"
        rounded={false}
        placeholderLabel={photoLabel}
        sizes="(max-width: 640px) 50vw, 25vw"
      />
      <div className="flex flex-1 flex-col justify-between gap-2 p-4">
        <h3 className="font-serif text-base leading-snug text-charcoal">{name}</h3>
        {price && <p className="font-semibold text-terracotta">{price}</p>}
      </div>
    </article>
  )
}
