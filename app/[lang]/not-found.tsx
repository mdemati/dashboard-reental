import Link from 'next/link'

// 404 dentro del árbol de idioma. Texto bilingüe simple (no conocemos el locale
// con certeza en not-found, mostramos ES/EN).
export default function NotFound() {
  return (
    <div className="container-amapola flex flex-col items-center justify-center py-28 text-center">
      <p className="font-serif text-6xl font-semibold text-clay-400">404</p>
      <h1 className="mt-4 font-serif text-2xl font-semibold text-charcoal">
        Página no encontrada · Page not found
      </h1>
      <p className="mt-3 max-w-md text-charcoal/70">
        Lo sentimos, no hemos encontrado lo que buscas. · Sorry, we couldn’t find what you were looking for.
      </p>
      <div className="mt-7 flex gap-3">
        <Link href="/es" className="btn-primary">
          Inicio
        </Link>
        <Link href="/en" className="btn-secondary">
          Home
        </Link>
      </div>
    </div>
  )
}
