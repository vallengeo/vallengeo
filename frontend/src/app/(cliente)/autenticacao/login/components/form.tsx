'use client'

import Link from "next/link";

import { useSearchParams, useRouter } from 'next/navigation'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, SubmitHandler } from "react-hook-form";
import { loginFormSchema, loginFormData } from "@/validation/autenticacao/login"

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

export function FormLogin() {
  const searchParams = useSearchParams()
  const router = useRouter();

  const form = useForm<loginFormData>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const onSubmit: SubmitHandler<loginFormData> = async (data) => {
    const user: IUserLogin = {
      email: data.email,
      senha: data.password,
      idGrupo: "4d3c1497-af40-4ddf-8b06-d8f40c8df139" // TODO: Ajustar para informar o grupo de forma dinamica
    };

    await login(user)
      .then(() => {
        router.push('/dashboard');
      })
      .catch(() => {
        actionLogout();
      })


  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="flex flex-col mb-2">
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="digite um e-mail"
                  autoComplete="off"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="********"
                  autoComplete="off"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          asChild
          variant="link"
          className="w-fit ml-auto mt-4 mb-6 justify-end px-0"
        >
          <Link href="/usuario/publico/esqueci-minha-senha">Esqueci minha senha</Link>
        </Button>

        <div className="flex items-center justify-between gap-2 flex-col-reverse sm:flex-row">
          <Button
            asChild
            variant="link"
            className="flex-shrink-0"
          >
            <Link href="/">Acessar sem login</Link>
          </Button>

          <Button
            type="submit"
            variant="default"
            className="px-16 h-12 w-full sm:w-fit"
          >
            Entrar
          </Button>
        </div>
      </form>
    </Form>
  )
}