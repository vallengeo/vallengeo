'use client'

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, SubmitHandler } from "react-hook-form";

const forgotPasswordUserFormSchema = z.object({
  email: z.string()
    .nonempty("Email é obrigatório")
    .email({
      message: "E-mail inválido, tente: example@example.com"
    })  ,
})

type forgotPasswordUserFormData = z.infer<typeof forgotPasswordUserFormSchema>

import Support from "@/components/support";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import MessageError from "@/components/message-error";

export default function ForgotPasswordPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<forgotPasswordUserFormData>({
    resolver: zodResolver(forgotPasswordUserFormSchema)
  });

  const onHandleSubmit: SubmitHandler<forgotPasswordUserFormData> = data => console.log(data);

  return (
    <div>
      <h1 className="text-[2rem] mt-6">Esqueceu sua senha?</h1>
      <p className="py-6">Informe seu e-mail de cadastro para enviarmos o código de validação.</p>

      <form onSubmit={handleSubmit(onHandleSubmit)}>
        <div className="flex flex-col gap-2 mb-6">
          <Label htmlFor="email">E-mail</Label>
          <Input
            id="email"
            type="email"
            placeholder="digite um e-mail"
            {...register('email')}
          />
          {errors.email && <MessageError>{errors.email.message}</MessageError>}
        </div>

        <div className="flex items-center justify-between gap-2 max-[350px]:flex-col-reverse max-[350px]:justify-center">
          <Support/>

          <Button type="submit" variant="default" className="px-16 h-12">
            Entrar
          </Button>
        </div>
      </form>
    </div>
  )
}