'use client'

import Link from "next/link";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, SubmitHandler } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";

import Support from "@/components/support";

const loginUserFormSchema = z.object({
  email: z.string({ required_error: "Email é obrigatório" })
    .nonempty("E-mail é obrigatório")
    .email({
      message: "E-mail inválido, tente: example@example.com"
    }),
  password: z.string({ required_error: "Senha é obrigatório" })
    .nonempty("Senha é obrigatório")
    .min(6, "Mínimo 6 dígitos")
})

type loginUserFormData = z.infer<typeof loginUserFormSchema>

export default function LoginPage() {
  const form = useForm<loginUserFormData>({
    resolver: zodResolver(loginUserFormSchema)
  });

  const onSubmit: SubmitHandler<loginUserFormData> = (data) => {
    console.log(data)
  }

  return (
    <div>
      <p className="mt-8 mb-6">Acesse a plataforma de regularização de imóveis através dos campos abaixo.</p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col">
          <div className="flex flex-col mb-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="email">E-mail</FormLabel>
                  <FormControl>
                    <Input
                      id="email"
                      type="email"
                      placeholder="digite um e-mail"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="password">Senha</FormLabel>
                  <FormControl>
                    <Input
                      id="password"
                      type="password"
                      placeholder="********"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
      </Form>
    </div>
  )
}