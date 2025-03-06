"use client";

import { zodResolver } from "@hookform/resolvers/zod";
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
  FormMessage,
} from "@/components/ui/form";
import {
  esqueciMinhaSenhaData,
  esqueciMinhaSenhaSchema,
} from "@/validation/usuario/esqueci-minha-senha";
import IEsqueciMinhaSenha from "@/interfaces/Usuario/IEsqueciMinhaSenha";
import { esqueciMinhaSenha } from "@/service/usuario";
import { useRouter, usePathname } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { Loader } from "@/components/loader";

export function FormEsqueciMinhaSenha() {
  const { toast } = useToast();

  const router = useRouter();
  const pathname = usePathname();
  const idMunicipio = pathname.split("/")[1];

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<esqueciMinhaSenhaData>({
    resolver: zodResolver(esqueciMinhaSenhaSchema),
    defaultValues: {
      email: "",
      modulo: "CIDADAO",
    },
  });

  const onSubmit: SubmitHandler<esqueciMinhaSenhaData> = (
    data: IEsqueciMinhaSenha
  ) => {
    setIsLoading(true);

    esqueciMinhaSenha(data)
      .then(() => {
        toast({
          title: "Código enviado!",
          description:
            "Use o código enviado ao seu e-mail para redefinir sua senha.",
        });

        router.push(`/${idMunicipio}/usuario/publico/recuperar-senha`);
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
        <div className="flex flex-col mb-6">
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

        <div className="flex items-center justify-between gap-2 max-[350px]:flex-col-reverse max-[350px]:justify-center">
          <Support />

          <Button
            type="submit"
            variant="default"
            className={`${isLoading ? "pointer-events-none " : ""}w-44 h-12`}
          >
            {isLoading ? <Loader /> : "Enviar"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
