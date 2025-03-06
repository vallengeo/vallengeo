"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  cadastroFormSchema,
  cadastroFormData,
} from "@/validation/autenticacao/cadastro";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import { useState } from "react";
import { Loader } from "@/components/loader";
import { useToast } from "@/components/ui/use-toast";
import { cadastrarUsuario } from "@/service/usuario";
import ICadastroUsuario from "@/interfaces/Usuario/ICadastroUsuario";

interface ICadastrarComEmail {
  municipio: string;
}

export function CadastrarComEmail({ municipio }: ICadastrarComEmail) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<cadastroFormData>({
    resolver: zodResolver(cadastroFormSchema),
    defaultValues: {
      nome_completo: "",
      email: "",
      cpf: "",
      telefone: "",
    },
  });

  const onSubmit: SubmitHandler<cadastroFormData> = async (data) => {
    setIsLoading(true);

    try {
      const sendData: ICadastroUsuario = {
        ...data,
        ativo: true,
        perfis: [
          {
            id: "8abc3181-d4d9-40ab-8477-5202074afae3", // CIDADAO
          },
        ],
        grupos: [
          {
            id: "4d3c1497-af40-4ddf-8b06-d8f40c8df139", // CRUZEIRO
          },
        ],
        telas: [
          {
            id: "05c3ec78-23be-49e1-80bd-45999c833851", // cod: IMOVEL
            permissoes: [
              {
                codigo: "IMOVEL_CADASTRAR",
              },
              {
                codigo: "IMOVEL_LISTA_IMOVEL_VISUALIZAR",
              },
            ],
          },
          {
            id: "116658af-2e74-4d6b-b8cf-99efee514cb0", // cod: RELATORIO
            permissoes: [
              {
                codigo: "RELATORIO_RESUMO_IMOVEL_DOWNLOAD",
              },
            ],
          },
        ],
        modulo: "CIDADAO",
      };

      const response = await cadastrarUsuario(sendData);
      console.log(response);
    } catch (error: any) {
      const errorTitle = error.response?.data?.title || error.title;
      const errorMessage = error.response?.data?.message || error.message;

      console.error(error);

      toast({
        title: errorTitle,
        description: errorMessage,
        variant: "destructive",
      });

      setIsLoading(false);
    }
  };

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
                  <Input type="text" {...field} />
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
                  <Input type="email" {...field} />
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
                  <Input type="tel" maxLength={15} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* <FormField
            control={form.control}
            name="senha"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha*</FormLabel>
                <FormControl>
                  <Input type="password" autoComplete="off" {...field} />
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
                  <Input type="password" autoComplete="off" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}
        </div>

        <div className="flex items-center justify-between flex-col-reverse sm:flex-row gap-6">
          <Button asChild variant="secondary" className="w-full sm:w-fit">
            <Link href={`/${municipio}/autenticacao`}>Voltar</Link>
          </Button>

          <Button
            type="submit"
            variant="default"
            className={`h-10 w-full sm:w-72 ${
              isLoading ? "pointer-events-none" : ""
            }`}
          >
            {isLoading ? <Loader /> : "Cadastrar"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
