import Support from "@/components/support";
import { Button } from "@/components/ui/button";

export default function ForgotPasswordPage() {
  return (
    <>
      <h1 className="text-[2rem] mt-6">Esqueceu sua senha?</h1>
      <p className="py-6">Informe seu e-mail de cadastro para enviarmos o código de validação.</p>

      <form action="">

        {/* todo: Campo de entrada */}

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