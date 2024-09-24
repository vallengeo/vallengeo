'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, SubmitHandler } from "react-hook-form";
import { cadastroFormSchema, cadastroFormData } from "@/validation/autenticacao/cadastro"
import { formatarCampo } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import Link from "next/link";

interface ICadastrarComGovbr {
  municipio: string
}

export function CadastrarComGovbr({ municipio }: ICadastrarComGovbr) {
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
                <FormLabel>Telefone*</FormLabel>
                <FormControl>
                  <Input
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

        <div className="flex items-center justify-between">
          <Button asChild variant="secondary">
            <Link href={`/${municipio}/autenticacao/cadastrar`}>
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