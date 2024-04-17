'use client'

import Link from "next/link";

import { useSearchParams, useRouter } from 'next/navigation'

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, SubmitHandler } from "react-hook-form";

import { Support } from "@/components/support";
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

import { actionLogout, login } from '@/service/authService'
import IUserLogin from "@/interfaces/IUserLogin";

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

export function FormLogin() {
  const searchParams = useSearchParams()
  const router = useRouter();

  const linkPreviousPage = searchParams.get('linkPreviousPage')

  const form = useForm<loginUserFormData>({
    resolver: zodResolver(loginUserFormSchema)
  });

  const onSubmit: SubmitHandler<loginUserFormData> = async (data) => {
    console.log(data)
    const user: IUserLogin = {
      email: data.email,
      senha: data.password,
      idGrupo: "4d3c1497-af40-4ddf-8b06-d8f40c8df139" // TODO: Ajustar para informar o grupo de forma dinamica
    };

    await login(user)
      .then(() => {
        router.push('/home');
      })
      .catch(() => {
        actionLogout();
      })


  }

  return (
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
          {linkPreviousPage ? (
            <Button
              asChild
              variant="link"
              className="flex-shrink-0"
            >
              <Link href="/">Acessar sem login</Link>
            </Button>
          ) : (
            <Support />
          )}

          <Button type="submit" variant="default" className="px-16 h-12">
            Entrar
          </Button>
        </div>
      </form>
    </Form>
  )
}