'use client'

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, SubmitHandler } from "react-hook-form";

const resetPasswordSchema = z.object({
  password: z.string()
    .nonempty("Senha é obrigatório")
    .min(6, "Mínimo 6 dígitos"),
  confirm_password: z.string()
    .nonempty("Senha é obrigatório")
    .min(6, "Mínimo 6 dígitos")
})
.refine(({ password, confirm_password}) => password === confirm_password, {
  message: "A senha não corresponde",
  path: ["confirm_password"]
})

type resetPasswordData = z.infer<typeof resetPasswordSchema>

import Support from "@/components/support";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import MessageError from "@/components/message-error";

export default function ResetPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<resetPasswordData>({
    resolver: zodResolver(resetPasswordSchema)
  });

  const onHandleSubmit: SubmitHandler<resetPasswordData> = data => console.log(data);

  return (
    <div>
      <h1 className="text-[2rem]/10 font-bold mt-6">Redefinir sua senha</h1>
      <p className="my-6">Informe uma senha válida para prosseguir com o a redefinição de senha.</p>

      <form onSubmit={handleSubmit(onHandleSubmit)} className="flex flex-col">
        <div className="flex flex-col gap-2 mb-2">
          <Label htmlFor="password">Nova senha</Label>
          <Input
            type="password"
            id="password"
            placeholder="********"
            {...register('password')}
          />
          {errors.password && <MessageError>{errors.password.message}</MessageError>}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="confirm_password">Repetir Senha</Label>
          <Input
            type="password"
            id="confirm_password"
            placeholder="********"
            {...register('confirm_password')}
          />
          {errors.confirm_password && <MessageError>{errors.confirm_password.message}</MessageError>}
        </div>

        <div className="flex items-center justify-between mt-6 gap-2 max-[350px]:flex-col-reverse max-[350px]:justify-center">
          <Support/>

          <Button type="submit" variant="default" className="px-16 h-12">
            Cadastrar
          </Button>
        </div>
      </form>
    </div>
  )
}