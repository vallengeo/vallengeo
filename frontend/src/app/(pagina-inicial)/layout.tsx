import type { Metadata } from 'next'

import { Sidebar } from '@/app/(pagina-inicial)/components/sidebar'
import { Copyright } from '@/components/copyright'

export const metadata: Metadata = {
  title: 'Página Inicial - VallenGeo',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="container flex gap-0 lg:gap-6 flex-col lg:flex-row">
      <aside className="sticky top-0 z-0 h-screen py-6 hidden lg:block">
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
  )
}
