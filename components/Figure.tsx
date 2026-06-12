import Image from 'next/image'
import { WheatIcon } from './Icons'

// Componente de imagen con marcador de posición.
// - Si se pasa `src`, renderiza next/image (optimizado, lazy salvo `priority`).
// - Si no, muestra un placeholder elegante indicando dónde irá la foto real.
// Reserva siempre el espacio (aspect-ratio) para evitar CLS.

type FigureProps = {
  src?: string
  alt: string
  /** Relación de aspecto CSS, p.ej. "16/9", "4/3", "1/1" */
  ratio?: string
  priority?: boolean
  sizes?: string
  className?: string
  /** Texto del placeholder (idioma del visitante) */
  placeholderLabel?: string
  rounded?: boolean
}

export default function Figure({
  src,
  alt,
  ratio = '4/3',
  priority = false,
  sizes = '(max-width: 768px) 100vw, 50vw',
  className = '',
  placeholderLabel = 'Foto',
  rounded = true,
}: FigureProps) {
  const radius = rounded ? 'rounded-xl2' : ''

  return (
    <div
      className={`relative overflow-hidden bg-clay-100 ${radius} ${className}`}
      style={{ aspectRatio: ratio }}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover"
        />
      ) : (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-clay-600"
          role="img"
          aria-label={alt}
          style={{
            backgroundImage:
              'linear-gradient(135deg, #F2E4D5 0%, #E6CBB0 45%, #E7ECE0 100%)',
          }}
        >
          <WheatIcon className="h-7 w-7 opacity-70" />
          <span className="px-3 text-center text-[11px] font-medium uppercase tracking-wider opacity-80">
            {placeholderLabel}
          </span>
        </div>
      )}
    </div>
  )
}
