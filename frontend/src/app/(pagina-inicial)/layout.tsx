import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { cn } from '@/lib/utils'
import '@/styles/globals.css'
import { Sidebar } from '@/app/(pagina-inicial)/components/sidebar'
import Copyright from '@/components/footer'

export const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
})

export const metadata: Metadata = {
  title: 'Portal do Cidadão - VallenGeo',
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
          <Sidebar/>

          <div className="flex-1 flex flex-col py-6">
            {children}

            <Copyright/>
          </div>
        </div>
      </body>
    </html>
  )
}
