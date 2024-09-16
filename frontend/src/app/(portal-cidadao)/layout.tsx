'use client'

import Link from "next/link";
import { Brasao } from "@/components/brasao";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Menu } from "./components/menu";
import { Copyright } from "@/components/copyright";
import { isLoggedIn } from "@/service/authService";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="h-screen flex flex-col">
      {isLoggedIn() ? (
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

      <footer
        role="contentinfo"
        className="bg-background-secondary py-6 text-center relative min-h-[68px]"
      >
        {isLoggedIn() && <Copyright />}
        <Brasao className="absolute top-1/2 -translate-y-1/2 right-4" />
      </footer>
    </div>
  )
}
