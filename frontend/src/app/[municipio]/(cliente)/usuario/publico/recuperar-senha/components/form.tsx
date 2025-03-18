"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  recuperarSenhaData,
  recuperarSenhaSchema,
} from "@/validation/usuario/recuperar-senha";
import { Loader } from "@/components/loader";
import { recuperarSenha } from "@/service/usuario";
import { useToast } from "@/components/ui/use-toast";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export function FormRecuperarSenha() {
  const { toast } = useToast();

  const router = useRouter();
  const pathname = usePathname();
  const idMunicipio = pathname.split("/")[1];

  const searchParams = useSearchParams();
  const codigoAcesso = searchParams.get("codigoAcesso");

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<recuperarSenhaData>({
    resolver: zodResolver(recuperarSenhaSchema),
    defaultValues: {
      codigoAcesso: "",
      senha: "",
      confirmacaoSenha: "",
    },
  });

  const { setValue } = form;

  useEffect(() => {
    if (codigoAcesso) {
      setValue("codigoAcesso", codigoAcesso);
    }
  }, []);

  const onSubmit: SubmitHandler<recuperarSenhaData> = (data) => {
    setIsLoading(true);

    recuperarSenha(data)
      .then(() => {
        toast({
          title: "Senha alterada com sucesso!",
          description: "Agora você pode fazer login com sua nova senha.",
        });

        router.push(`/${idMunicipio}/autenticacao/login`);
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
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="codigoAcesso"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Código</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    maxLength={6}
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
            name="senha"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="senha">Senha</FormLabel>
                <FormControl>
                  <Input
                    id="senha"
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
            name="confirmacaoSenha"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="confirmar_senha">Confirmar senha</FormLabel>
                <FormControl>
                  <Input
                    id="confirmar_senha"
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

        <div className="flex justify-between items-center mt-6 gap-2">
          <Button
            variant="default"
            className={`${
              isLoading ? "pointer-events-none" : ""
            } w-44 h-12 ml-auto`}
          >
            {isLoading ? <Loader /> : "Enviar"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
