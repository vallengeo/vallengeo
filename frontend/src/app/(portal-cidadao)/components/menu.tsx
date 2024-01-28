import Link from "next/link";
import { Button } from "@/components/ui/button";
import Profile from "@/components/profile";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Menu() {

  const isLoggedIn = false;

  return (
    <>
      {isLoggedIn
        ?
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Profile/>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              alignOffset={-24}
              className="min-w-[12rem] py-4 rounded-2xl space-y-2 before:contents[''] before:absolute before:-top-3.5 before:right-6 before:triangle-to-top"
            >
              <DropdownMenuItem className="text-base justify-center">Meus imóveis</DropdownMenuItem>
              <DropdownMenuItem className="text-base justify-center">Configurações</DropdownMenuItem>
              <DropdownMenuItem className="text-base justify-center">
                <Link href="/logout">
                  Sair
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        :
        <Link href="/autenticacao/login">
          <Button variant="default">
            Entrar
          </Button>
        </Link>
      }
    </>
  )
}