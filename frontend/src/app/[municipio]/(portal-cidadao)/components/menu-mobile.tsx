"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProfileTrigger } from "@/components/profile-trigger";
import { useRouter } from "next/navigation";
import { actionLogout } from "@/service/authService";
import { Building, LogOut, Menu, Settings } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Logo } from "@/components/logo";

interface IMenuMobile {
  municipio: string;
}

export function MenuMobile({ municipio }: IMenuMobile) {
  const router = useRouter();
  const logout = () => {
    actionLogout().then(() => {
      router.refresh();
      router.push(`/${municipio}/autenticacao/login`)
    });
  };

  return (
    <nav aria-label="Menu de navegação mobile" className="sm:hidden">
      <Sheet>
        <SheetTrigger>
          <Menu className="text-white" />
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

          <Link
            href={`/${municipio}/imoveis`}
            className="inline-flex items-center gap-4 font-medium"
          >
            <Building size={20} />
            Registro de Imóveis
          </Link>

          <div className="pt-6 border-t border-t-stone-600 mt-auto">
            <ProfileTrigger className="justify-start mb-4" />

            <div className="flex flex-col gap-4">
              <Link
                href={`/${municipio}/configuracoes`}
                className="inline-flex items-center gap-4 font-medium"
              >
                <Settings size={20} />
                Configurações
              </Link>

              <Button
                onClick={logout}
                variant="no-style"
                size="no-style"
                className="inline-flex items-center justify-start gap-4 font-medium text-base"
              >
                <LogOut size={20} />
                Sair
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  );
}
