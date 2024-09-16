'use client'

import { Sidebar } from '@/app/(pagina-inicial)/components/sidebar'
import { Copyright } from '@/components/copyright'
import { SplashScreen } from '@/components/splash-screen'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const canShowSplashScreen = pathname === '/' || pathname === '/dashboard'
  const [isLoading, setIsLoading] = useState<boolean>(canShowSplashScreen);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  useEffect(() => {
    if (canShowSplashScreen) {
      document.querySelector('body')?.classList.add('overflow-hidden');
      const timeout = setTimeout(() => {
        setIsAnimating(true);

        setTimeout(() => {
          document.querySelector('body')?.classList.remove('overflow-hidden');
          setIsLoading(false);
        }, 1000);
      }, 6000);

      return () => clearTimeout(timeout);
    }
  }, [canShowSplashScreen])

  return (
    <div className="container flex gap-0 lg:gap-6 flex-col lg:flex-row">
      {isLoading && canShowSplashScreen && (
        <SplashScreen isAnimating={isAnimating} />
      )}

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
