import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { cn } from '@/lib/utils'
import '@/styles/globals.css'

import { Brasao } from "@/components/brasao";
import { CityBackdrop } from "@/components/cityBackdrop";
import { Toaster } from '@/components/ui/toaster';

export const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
})

export const metadata: Metadata = {
  title: 'Login - VallenGeo',
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
      <body className={cn("min-h-screen bg-white text-secondary-foreground antialiased", inter.className)}>
        <main>
          <div className="container relative">
            <div className="lg:w-1/2 h-screen flex">
              <div className="max-w-sm m-auto">
                {children}

                <div className="mt-12">
                  <Brasao className="mx-auto"/>
                </div>
              </div>
            </div>
            <div className="absolute w-1/2 inset-0 ml-auto max-lg:hidden">
              <CityBackdrop/>
            </div>
          </div>
        </main>
        <Toaster />
      </body>
    </html>
  )
}
