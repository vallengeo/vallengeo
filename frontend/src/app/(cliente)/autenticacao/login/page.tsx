'use client'

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, SubmitHandler } from "react-hook-form";

const loginUserFormSchema = z.object({
  email: z.string()
    .nonempty("E-mail é obrigatório")
    .email({
      message: "E-mail inválido, tente: example@example.com"
    }),
  password: z.string()
    .nonempty("Senha é obrigatório")
    .min(6, "Mínimo 6 dígitos")
})

type loginUserFormData = z.infer<typeof loginUserFormSchema>

import Link from "next/link";

import Support from "@/components/support";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import MessageError from "@/components/message-error";

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<loginUserFormData>({
    resolver: zodResolver(loginUserFormSchema)
  });

  const onHandleSubmit: SubmitHandler<loginUserFormData> = data => console.log(data);

  return (
    <div>
      <p className="mt-8 mb-6">Acesse a plataforma de regularização de imóveis através dos campos abaixo.</p>

      <form onSubmit={handleSubmit(onHandleSubmit)} className="flex flex-col">
        <div className="flex flex-col mb-2">
          <Label htmlFor="email">E-mail</Label>
          <Input
            id="email"
            type="email"
            placeholder="digite um e-mail"
            {...register("email")}
          />
          {errors.email && <MessageError>{errors.email.message}</MessageError>}
        </div>

        <div className="flex flex-col">
          <Label htmlFor="password">Senha</Label>
          <Input
            id="password"
            type="password"
            placeholder="********"
            {...register("password")}
          />
          {errors.password && <MessageError>{errors.password.message}</MessageError>}
        </div>

        <Button variant="link" className="w-fit ml-auto mt-4 mb-6 justify-end px-0">
          <Link href="/usuario/publico/esqueci-minha-senha">Esqueci minha senha</Link>
        </Button>

        <div className="flex items-center justify-between gap-2 max-[350px]:flex-col-reverse max-[350px]:justify-center">
          <Support />

          <Button type="submit" variant="default" className="px-16 h-12">
            Entrar
          </Button>
        </div>
      </form>
    </div>
  )
}