import Link from "next/link";
import type { Metadata } from 'next'

import { Brasao } from "@/components/brasao";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Menu } from "./components/menu";
import { Copyright } from "@/components/copyright";

export const metadata: Metadata = {
  title: 'Portal do Cidadão | VallenGeo',
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
  const isLoggedIn = true;

  return (
    <div className="h-screen flex flex-col">
      {isLoggedIn ? (
        <header role="banner" className="bg-primary-foreground py-6">
          <div className="container">
            <div className="flex items-center justify-between gap-6 max-[450px]:flex-col">
              <Link href="/">
                <Logo />
              </Link>
              <Menu />
            </div>
          </div>
        </header>
      ) : (
        <header role="banner" className="container fixed left-0 right-0 top-6 z-20">
          <div className="flex items-center justify-between gap-6 max-[450px]:flex-col bg-primary-foreground py-6 pl-6 pr-9 rounded-2xl">
            <Link href="/">
              <Logo />
            </Link>

            <Button asChild>
              <Link href="/autenticacao">
                Entrar
              </Link>
            </Button>
          </div>
        </header>
      )}

      <div className="flex-1">
        {children}
      </div>

      {isLoggedIn ? (
        <footer role="contentinfo" className="bg-background-secondary py-6 text-center relative">
          <Copyright />
          <Brasao className="absolute top-1/2 -translate-y-1/2 right-4" />
        </footer>
      ) : (
        <footer role="contentinfo" className="bg-background-secondary py-2">
          <div className="container">
            <Brasao className="ml-auto" />
          </div>
        </footer>
      )}
    </div>
  )
}
