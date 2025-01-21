"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ChevronLeft, LogOut, Menu as MenuIcon } from "lucide-react";
import { Brasao } from "@/components/brasao";
import { Logo } from "@/components/logo";
import { Menu } from "./menu";
import { Profile } from "@/components/profile";
import { actionLogout } from "@/service/authService";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  title: string;
  children?: React.ReactNode;
  linkBack?: string;
}

export function Header({ title, children, linkBack }: HeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const idMunicipio = pathname.split("/")[1] || "";

  const logout = () => {
    actionLogout().then(() => {
      router.push(`/${idMunicipio}`);
    });
  };

  return (
    <header role="banner" className="flex items-center justify-between gap-y-4">
      <div className="flex flex-col">
        <div className="flex items-center gap-3">
          <Sheet>
            <SheetTrigger className="lg:hidden">
              <MenuIcon className="text-foreground" />
            </SheetTrigger>
            <SheetContent
              side={`left`}
              className="flex flex-col gap-6 text-[#FCFCFC] py-6 px-4"
            >
              <SheetHeader className="sr-only">
                <SheetTitle>Menu</SheetTitle>
                <SheetDescription>Links de navegação</SheetDescription>
              </SheetHeader>

              <Logo />
              <Menu municipio={idMunicipio} />

              <div className="space-y-4 mt-auto">
                <Profile />

                <div>
                  <Button
                    type="button"
                    onClick={logout}
                    variant={`no-style`}
                    size={`no-style`}
                    className="inline-flex items-center gap-1 font-semibold text-base"
                  >
                    <LogOut size={18} />
                    Sair
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          <h1 className="flex items-center text-2xl md:text-[2rem] font-semibold">
            {linkBack && (
              <Link href={linkBack}>
                <ChevronLeft />
              </Link>
            )}
            {title}
          </h1>
        </div>

        {children}
      </div>

      <Brasao />
    </header>
  );
}
