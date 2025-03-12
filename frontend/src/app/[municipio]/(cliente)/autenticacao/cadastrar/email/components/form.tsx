'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, SubmitHandler } from "react-hook-form";
import { cadastroFormSchema, cadastroFormData } from "@/validation/autenticacao/cadastro"

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

import Link from "next/link";

interface ICadastrarComEmail {
  municipio: string
}

export function CadastrarComEmail({ municipio }: ICadastrarComEmail) {
  const form = useForm<cadastroFormData>({
    resolver: zodResolver(cadastroFormSchema),
    defaultValues: {
      nome_completo: "",
      email: "",
      cpf: "",
      telefone: "",
      senha: "",
      confirmar_senha: ""
    }
  });

  const onSubmit: SubmitHandler<cadastroFormData> = (data) => {
    console.log(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="nome_completo"
            render={({ field }) => (
              <FormItem className="sm:col-span-2">
                <FormLabel>Nome completo*</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="sm:col-span-2">
                <FormLabel>E-mail*</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cpf"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CPF*</FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    maxLength={14}
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
            name="telefone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefone*</FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    maxLength={15}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="senha"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha*</FormLabel>
                <FormControl>
                  <Input
                    type="password"
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
            name="confirmar_senha"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirmar senha*</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    autoComplete="off"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex items-center justify-between flex-col-reverse sm:flex-row gap-6">
          <Button asChild variant="secondary" className="w-72 sm:w-fit">
            <Link href={`/${municipio}/autenticacao`}>
              Voltar
            </Link>
          </Button>

          <Button type="submit" className="w-72 sm:w-fit">
            Cadastrar
          </Button>
        </div>
      </form>
    </Form>
  )
}