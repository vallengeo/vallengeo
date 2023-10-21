import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { cn } from '@/lib/utils'
import '@/styles/globals.css'

import Logo from "@/components/logo";
import Brasao from "@/components/prefeitura/brasao";
import CityBackdrop from "@/components/prefeitura/cityBackdrop";

export const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
})

export const metadata: Metadata = {
  title: 'Login - VallenGeo',
  description: 'VallenGeo - Sistema de Prefeituras',
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
            <div className="container">
              <div className="w-1/2 h-screen flex">
                <div className="max-w-sm m-auto">
                  <Logo useBlackLogo />

                  {children}

                  <div className="mt-12">
                    <Brasao/>
                  </div>
                </div>
              </div>
              <div className="absolute w-1/2 inset-0 ml-auto">
                <CityBackdrop/>
              </div>
            </div>
          </main>
      </body>
    </html>
  )
}
