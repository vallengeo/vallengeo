import Link from "next/link";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Menu } from "./menu";
import { isAuthenticated } from "@/service/authService";
import { MenuMobile } from "./menu-mobile";

interface HeaderProps {
  municipio: string;
}

export function Header({ municipio }: HeaderProps) {
  return (
    <>
      {isAuthenticated() ? (
        <header role="banner" className="sticky top-0 z-10 bg-primary-foreground py-6">
          <div className="container">
            <div className="flex items-center justify-between gap-6">
              <Link href={`/${municipio}`}>
                <Logo />
              </Link>

              <Menu municipio={municipio} />
              <MenuMobile municipio={municipio} />
            </div>
          </div>
        </header>
      ) : (
        <header
          role="banner"
          className="container fixed left-0 right-0 top-6 z-20"
        >
          <div className="flex items-center justify-between gap-6 bg-primary-foreground p-6 sm:py-6 sm:pl-6 sm:pr-9 rounded-2xl">
            <Link href={`/${municipio}`}>
              <Logo />
            </Link>

            <Button asChild className="px-6 sm:px-10">
              <Link href={`/${municipio}/autenticacao`}>Entrar</Link>
            </Button>
          </div>
        </header>
      )}
    </>
  );
}
