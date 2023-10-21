import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ForgotPasswordPage() {
  return (
    <>
      <h1 className="text-[2rem] mt-6">Esqueceu sua senha?</h1>
      <p className="py-6">Informe seu e-mail de cadastro para enviarmos o código de validação.</p>

      <form action="">

        {/* todo: Campo de entrada */}

        <div className="flex items-center justify-between">
          <Button variant="link" className="flex-1">
            <Link href="/suporte">
              Suporte
            </Link>
          </Button>

          <Button variant="default" className="px-16 h-12">
            Entrar
          </Button>
        </div>
      </form>
    </>
  )
}