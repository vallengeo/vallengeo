import Link from "next/link";

import Support from "@/components/support";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  return (
    <div>
      <p className="mt-8 mb-6">Acesse a plataforma de regularização de imóveis através dos campos abaixo.</p>

      <form action="" className="flex flex-col">
        <div className="flex flex-col gap-2 mb-2">
          <Label htmlFor="email">E-mail</Label>
          <Input
            type="email"
            id="email"
            name="email"
            placeholder="digite um e-mail"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="password">Senha</Label>
          <Input
            type="password"
            id="password"
            name="password"
            placeholder="********"
            min="6"
            required
          />
        </div>

        <Button variant="link" className="w-fit ml-auto mt-4 mb-6 justify-end px-0">
          <Link href="/forgotpassword">Esqueci minha senha</Link>
        </Button>

        <div className="flex items-center justify-between gap-2 max-[350px]:flex-col-reverse max-[350px]:justify-center">
          <Support />

          <Button variant="default" className="px-16 h-12">
            Entrar
          </Button>
        </div>
      </form>
    </div>
  )
}