import { Brasao } from "@/components/brasao";
import { CityBackdrop } from "@/components/cityBackdrop";

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Login - VallenGeo',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="container relative">
      <div className="lg:w-1/2 h-screen flex">
        <div className="w-full max-w-sm m-auto py-6 lg:py-0">
          <main role="main">
            {children}
          </main>

          <div className="mt-12">
            <Brasao className="mx-auto" />
          </div>
        </div>
      </div>
      <div className="absolute w-1/2 inset-0 ml-auto hidden lg:block">
        <CityBackdrop />
      </div>
    </div>
  )
}
