import Figure from './Figure'

// Galería tipo masonry sencilla con CSS columns. Sin lightbox, visualización limpia.
// Acepta una lista de fotos reales (src + alt) o, en su defecto, renderiza
// `count` placeholders con relaciones de aspecto variadas.

type Photo = { src?: string; alt: string }

const ratios = ['4/3', '3/4', '1/1', '4/5', '3/2', '1/1', '4/3', '3/4', '4/5', '3/2']

export default function Gallery({
  photos,
  count = 8,
  photoLabel,
}: {
  photos?: Photo[]
  count?: number
  photoLabel: string
}) {
  const items: Photo[] =
    photos && photos.length > 0
      ? photos
      : Array.from({ length: count }, (_, i) => ({ alt: `${photoLabel} ${i + 1}` }))

  return (
    <div className="columns-2 gap-3 sm:columns-3 lg:columns-4 [&>*]:mb-3">
      {items.map((photo, i) => (
        <Figure
          key={i}
          src={photo.src}
          alt={photo.alt}
          ratio={ratios[i % ratios.length]}
          placeholderLabel={photoLabel}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="break-inside-avoid"
        />
      ))}
    </div>
  )
}
