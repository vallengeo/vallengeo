import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function RecoverPasswordPage() {
  return (
    <div>
      <h1 className="text-[2rem]/10 font-bold mt-6">Enviamos um código para seu e-mail!</h1>
      <p className="my-6">
        Seu código de redefinição de senha expirará em <b>{'{X}'}</b> segundos.
        Por favor, forneça-o no campo abaixo para proceder com a redefinição da sua senha de usuário.
      </p>

      <form action="">
        <div className="flex flex-col gap-2">
          <Label htmlFor="code">Código</Label>
          <Input
            type="text"
            id="code"
            name="code"
            required
          />
        </div>
      </form>
    </div>
  )
}