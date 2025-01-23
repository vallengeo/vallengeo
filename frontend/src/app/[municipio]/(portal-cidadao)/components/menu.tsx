"use client";

import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ProfileTrigger } from "@/components/profile-trigger";
import { useRouter } from "next/navigation";
import { actionLogout } from "@/service/authService";

interface IMenu {
  municipio: string;
}

export function Menu({ municipio }: IMenu) {
  const router = useRouter();
  const logout = () => {
    actionLogout().then(() => {
      router.refresh();
      router.push(`/${municipio}`)
    });
  };

  return (
    <nav
      aria-label="Menu de navegação desktop"
      className="hidden sm:flex items-center gap-x-8"
    >
      <Link
        href={`/${municipio}/imoveis`}
        className="inline-flex items-center gap-2 text-[#FCFCFC] font-medium"
      >
        Registro de Imóveis
      </Link>

      <DropdownMenu modal={false}>
        <DropdownMenuTrigger>
          <ProfileTrigger />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          alignOffset={-24}
          className="min-w-[12rem] py-4 rounded-2xl before:content-[''] before:absolute before:-top-3.5 before:right-6 before:triangle-to-top"
        >
          <DropdownMenuItem className="text-base">
            <Link
              href={`/${municipio}/configuracoes`}
              className="flex justify-center w-full"
            >
              Configurações
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="text-base justify-center mt-4">
            <Button
              onClick={logout}
              variant="no-style"
              size="no-style"
              className="w-full"
            >
              Sair
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
}
