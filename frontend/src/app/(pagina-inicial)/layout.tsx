import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { cn } from '@/lib/utils'
import '@/styles/globals.css'
import { Sidebar } from '@/app/(pagina-inicial)/components/sidebar'
import Copyright from '@/components/footer'

export const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
})

export const metadata: Metadata = {
  title: 'Portal do Cidadão - VallenGeo',
  description: 'VallenGeo - Sistema de Prefeituras',
}

export default function PaginaInicialLayout({
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
        <div className="container flex gap-6 py-6 h-screen">
          <Sidebar/>

          <div className="flex-1 flex flex-col h-full">
            {children}

            <Copyright/>
          </div>
        </div>
      </body>
    </html>
  )
}
