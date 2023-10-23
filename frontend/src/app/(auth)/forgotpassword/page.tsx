import Support from "@/components/support";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ForgotPasswordPage() {
  return (
    <div>
      <h1 className="text-[2rem] mt-6">Esqueceu sua senha?</h1>
      <p className="py-6">Informe seu e-mail de cadastro para enviarmos o código de validação.</p>

      <form action="">
        <div className="flex flex-col gap-2 mb-6">
          <Label htmlFor="email">E-mail</Label>
          <Input
            type="email"
            id="email"
            name="email"
            placeholder="digite um e-mail"
            required
          />
        </div>

        <div className="flex items-center justify-between">
          <Support/>

          <Button variant="default" className="px-16 h-12">
            Entrar
          </Button>
        </div>
      </form>
    </div>
  )
}