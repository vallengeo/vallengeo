import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { cn } from '@/lib/utils'
import '@/styles/globals.css'

export const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
})

export const metadata: Metadata = {
  title: 'Portal do Cidadão - VallenGeo',
  description: 'VallenGeo - Sistema de Prefeituras',
}

export default function PortalCidadaoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt">
      <head>
        <link
          rel="icon"
          href="/icon?<generated>"
          type="image/<generated>"
          sizes="<generated>"
        />
      </head>
      <body className={cn("min-h-screen bg-background antialiased", inter.className)}>
        {children}
      </body>
    </html>
  )
}
