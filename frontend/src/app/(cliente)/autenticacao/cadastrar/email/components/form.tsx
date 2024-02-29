'use client'

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, SubmitHandler } from "react-hook-form";

import { formatarCampo } from "@/lib/utils";

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

const cadastroFormSchema = z.object({
  nome_completo: z
    .string({ required_error: "Nome é obrigatório" })
    .nonempty("Nome é obrigatório"),

  email: z
    .string({ required_error: "Email é obrigatório" })
    .nonempty("E-mail é obrigatório")
    .email({
      message: "E-mail inválido, tente: exemplo@exemplo.com"
    }),

  cpf: z
    .string({ required_error: "CPF é obrigatório" }),

  telefone: z
    .string({ required_error: "Telefone é obrigatório" }),

  senha: z
    .string({ required_error: "Senha é obrigatório" })
    .nonempty("Senha é obrigatório")
    .min(6, "Mínimo 6 dígitos"),

  confirmar_senha: z
    .string({ required_error: "Senha é obrigatório" })
    .nonempty("Senha é obrigatório")
    .min(6, "Mínimo 6 dígitos")
})
  .refine(({ senha, confirmar_senha }) => senha === confirmar_senha, {
    message: "A senha não corresponde",
    path: ["confirmar_senha"]
  })

type cadastroFormData = z.infer<typeof cadastroFormSchema>

export function CadastrarComEmail() {
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

  function handleChangeCPF(e: React.ChangeEvent<HTMLInputElement>) {
    const rawValue = e.target.value;
    const formattedValue = formatarCampo(rawValue, 'CPF')
    form.setValue('cpf', formattedValue)
  }

  function handleChangeTelefone(e: React.ChangeEvent<HTMLInputElement>) {
    const rawValue = e.target.value;
    const formattedValue = formatarCampo(rawValue, 'Telefone');
    form.setValue('telefone', formattedValue);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="nome_completo"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel htmlFor="nome-completo">Nome completo*</FormLabel>
                <FormControl>
                  <Input
                    id="nome-completo"
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
              <FormItem className="col-span-2">
                <FormLabel htmlFor="email">E-mail*</FormLabel>
                <FormControl>
                  <Input
                    id="email"
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
                <FormLabel htmlFor="cpf">CPF*</FormLabel>
                <FormControl>
                  <Input
                    id="cpf"
                    type="tel"
                    maxLength={14}
                    {...field}
                    onChange={handleChangeCPF}
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
                <FormLabel htmlFor="telefone">Telefone*</FormLabel>
                <FormControl>
                  <Input
                    id="telefone"
                    type="tel"
                    maxLength={15}
                    {...field}
                    onChange={handleChangeTelefone}
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
                <FormLabel htmlFor="senha">Senha*</FormLabel>
                <FormControl>
                  <Input
                    id="senha"
                    type="password"
                    autoComplete="on"
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
                <FormLabel htmlFor="confirmar-senha">Confirmar senha*</FormLabel>
                <FormControl>
                  <Input
                    id="confirmar-senha"
                    type="password"
                    autoComplete="on"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex items-center justify-between">
          <Button asChild variant="secondary">
            <Link href="/autenticacao/cadastrar">
              Voltar
            </Link>
          </Button>

          <Button type="submit">
            Cadastrar
          </Button>
        </div>
      </form>
    </Form>
  )
}