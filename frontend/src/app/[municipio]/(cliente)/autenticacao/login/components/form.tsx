'use client'

import Link from "next/link";
import { useState } from "react"
import { useRouter } from 'next/navigation'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, SubmitHandler } from "react-hook-form";
import { loginFormSchema, loginFormData } from "@/validation/autenticacao/login"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Loader } from "@/components/loader"
import { login } from '@/service/authService'
import IUserLogin from "@/interfaces/IUserLogin";
import { useToast } from "@/components/ui/use-toast";

interface IFormLogin {
  municipio: string
}

export function FormLogin({ municipio }: IFormLogin) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<loginFormData>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const onSubmit: SubmitHandler<loginFormData> = async (data) => {
    setIsLoading(true);

    const user: IUserLogin = {
      email: data.email,
      senha: data.password,
      idGrupo: "4d3c1497-af40-4ddf-8b06-d8f40c8df139"
    };

    await login(user)
      .then(() => {
        router.refresh();
        router.push(`/${municipio}/dashboard`);
      })
      .catch((error) => {
        console.error(error);
        toast({
          variant: 'destructive',
          description: error.toString(),
        });

        setIsLoading(false);
      });
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
          <Link href={`/${municipio}/usuario/publico/esqueci-minha-senha`}>Esqueci minha senha</Link>
        </Button>

        <div className="flex items-center justify-between gap-2 flex-col-reverse sm:flex-row">
          <Button
            asChild
            variant="link"
            className="flex-shrink-0"
          >
            <Link href={`/${municipio}`}>Acessar sem login</Link>
          </Button>

          <Button
            type="submit"
            variant="default"
            className={`'h-12 w-full sm:w-44' ${isLoading ? 'pointer-events-none' : ''}`}
          >
            {isLoading ? <Loader /> : 'Entrar'}
          </Button>
        </div>
      </form>
    </Form>
  )
}
