// Inyecta datos estructurados JSON-LD de forma segura.

export default function JsonLd({ data }: { data: object | object[] }) {
  const json = JSON.stringify(data)
  return (
    <script
      type="application/ld+json"
      // El contenido es generado por nosotros (no input de usuario).
      dangerouslySetInnerHTML={{ __html: json }}
    />
  )
}
