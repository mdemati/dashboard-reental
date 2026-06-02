import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Reental — Dashboard PPC',
  description: 'Panel unificado de Google Ads y Meta Ads para Reental',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-gray-50 font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
