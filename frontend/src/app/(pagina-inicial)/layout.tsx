import type { Metadata } from 'next'
import { cn } from '@/lib/utils'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'

import { Sidebar } from '@/app/(pagina-inicial)/components/sidebar'
import { Copyright } from '@/components/copyright'

export const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
})

export const metadata: Metadata = {
  title: 'Página Inicial - VallenGeo',
  description: 'VallenGeo - Sistema de Prefeituras',
  icons: {
    icon: '/icon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt">
      <body className={cn("min-h-screen bg-background antialiased", inter.className)}>
        <div className="container flex gap-6 max-md:gap-0 max-md:flex-col max-md:h-screen">
          <aside role="banner" className="h-screen py-6 max-md:hidden">
            <Sidebar />
          </aside>

          <div className="flex-1 flex flex-col py-6">
            {children}

            <footer
              role="contentinfo"
              className="bg-[#F5F5F5] rounded-2xl text-center mt-auto py-3"
            >
              <Copyright />
            </footer>
          </div>
        </div>
      </body>
    </html>
  )
}
