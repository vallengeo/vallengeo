import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { cn } from '@/lib/utils'
import '@/styles/globals.css'
import { Sidebar } from '@/components/sidebar'

export const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
})

export const metadata: Metadata = {
  title: 'Portal do Cidadão - VallenGeo',
  description: 'VallenGeo - Sistema de Prefeituras',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt">
      <body className={cn("min-h-screen bg-background antialiased", inter.className)}>
        <div className="container flex gap-6 py-6 h-screen">
          <Sidebar/>

          <div className="flex-1">
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}
