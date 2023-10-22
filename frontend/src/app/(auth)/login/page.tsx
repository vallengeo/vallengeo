import Link from "next/link";
import { Button } from "@/components/ui/button";
import Support from "@/components/support";

export default function LoginPage() {
  return (
    <>
      <p className="mt-8 mb-6">Acesse a plataforma de regularização de imóveis através dos campos abaixo.</p>

      <form action="" className="flex flex-col">

        {/* todo: Campo de entrada */}

        <Button variant="link" className="mt-4 mb-6 justify-end px-0">
          <Link href="/forgotpassword">Esqueci minha senha</Link>
        </Button>

        <div className="flex items-center justify-between">
          <Support/>

          <Button variant="default" className="px-16 h-12">
            Entrar
          </Button>
        </div>
      </form>
    </>
  )
}