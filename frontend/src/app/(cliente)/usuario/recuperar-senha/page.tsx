'use client'

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, SubmitHandler } from "react-hook-form";

const recoveryPasswordUserFormSchema = z.object({
  code: z.string()
    .length(6, {
      message: 'O código deve ter 6 dígitos.'
    })
    .refine(data => /^\d+$/.test(data), {
      message: 'O código deve conter apenas números.',
    }),
})

type recoveryPasswordUserFormData = z.infer<typeof recoveryPasswordUserFormSchema>

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import MessageError from "@/components/message-error";

export default function RecoverPasswordPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<recoveryPasswordUserFormData>({
    resolver: zodResolver(recoveryPasswordUserFormSchema)
  });

  const onHandleSubmit: SubmitHandler<recoveryPasswordUserFormData> = data => console.log(data);

  return (
    <div>
      <h1 className="text-[2rem]/10 font-bold mt-6">Enviamos um código para seu e-mail!</h1>
      <p className="my-6">
        Seu código de redefinição de senha expirará em <b>{'{X}'}</b> segundos.
        Por favor, forneça-o no campo abaixo para proceder com a redefinição da sua senha de usuário.
      </p>

      <form onSubmit={handleSubmit(onHandleSubmit)}>
        <div className="flex flex-col">
          <Label htmlFor="code">Código</Label>
          <Input
            type="text"
            id="code"
            {...register('code')}
            maxLength={6}
          />
          {errors.code && <MessageError>{errors.code.message}</MessageError>}
        </div>
      </form>
    </div>
  )
}