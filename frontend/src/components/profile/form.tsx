"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
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
import {
  recuperarSenhaSchema,
  recuperarSenhaData,
} from "@/validation/usuario/recuperar-senha";
import { useToast } from "../ui/use-toast";
import { useState } from "react";
import { recuperarSenha } from "@/service/usuario";
import { Loader } from "../loader";

export function FormRedefinirSenha() {
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<recuperarSenhaData>({
    resolver: zodResolver(recuperarSenhaSchema),
    defaultValues: {
      codigoAcesso: "",
      senha: "",
      confirmar_senha: "",
    },
  });

  const onSubmit: SubmitHandler<recuperarSenhaData> = (data) => {
    setIsLoading(true);

    recuperarSenha(data)
      .then(() => {
        toast({
          description: "Senha alterada com sucesso!",
        });

        form.reset();
      })
      .catch((error: any) => {
        const errorTitle = error.response?.data?.messageTitle || error.title;
        const errorMessage = error.response?.data?.message || error.message;

        toast({
          title: errorTitle,
          description: errorMessage,
          variant: "destructive",
        });

        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2.5">
          <FormField
            control={form.control}
            name="codigoAcesso"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="font-semibold">Código</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    maxLength={6}
                    autoComplete="off"
                    className="max-w-none bg-input border-0"
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
              <FormItem className="space-y-2">
                <FormLabel className="font-semibold">Nova senha</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="********"
                    autoComplete="off"
                    className="max-w-none bg-input border-0"
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
              <FormItem className="space-y-2">
                <FormLabel className="font-semibold">Repetir senha</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="********"
                    autoComplete="off"
                    className="max-w-none bg-input border-0"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex items-center justify-end gap-4">
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              form.reset({
                senha: "",
                confirmar_senha: "",
              });
            }}
          >
            Limpar
          </Button>

          <Button
            type="submit"
            variant="default"
            className={`${isLoading ? "pointer-events-none" : ""} w-36 h-10`}
          >
            {isLoading ? <Loader /> : "Salvar"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
