import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { ProfileTrigger } from "@/components/profile-trigger";

export function Menu() {
  return (
    <div className="flex items-center gap-x-8">
      <Link
        href="/imoveis"
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
          <DropdownMenuItem className="text-base justify-center">
            <Link href="/configuracoes">
              Configurações
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="text-base justify-center mt-4">
            <Link href="/autenticacao/logout">
              Sair
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}