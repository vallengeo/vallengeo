import Support from "@/components/support";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ResetPage() {
  return (
    <div>
      <h1 className="text-[2rem]/10 font-bold mt-6">Redefinir sua senha</h1>
      <p className="my-6">Informe uma senha válida para prosseguir com o a redefinição de senha.</p>

      <form action="" className="flex flex-col">
        <div className="flex flex-col gap-2 mb-2">
          <Label htmlFor="new_password">Nova senha</Label>
          <Input
            type="password"
            id="new_password"
            name="new_password"
            placeholder="********"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="repeat_new_password">Repetir Senha</Label>
          <Input
            type="password"
            id="repeat_new_password"
            name="repeat_new_password"
            placeholder="********"
            required
          />
        </div>

        <div className="flex items-center justify-between mt-6">
          <Support/>

          <Button variant="default" className="px-16 h-12">
            Cadastrar
          </Button>
        </div>
      </form>
    </div>
  )
}