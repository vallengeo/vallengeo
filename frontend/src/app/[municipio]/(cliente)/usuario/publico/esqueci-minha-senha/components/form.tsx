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
  recuperarSenhaData,
  recuperarSenhaSchema,
} from "@/validation/usuario/recuperar-senha";
import IEsqueciMinhaSenha from "@/interfaces/Usuario/IEsqueciMinhaSenha";
import { esqueciMinhaSenha } from "@/service/usuario";
import { useRouter, usePathname } from "next/navigation";

export function FormEsqueciMinhaSenha() {
  const router = useRouter();
  const pathname  = usePathname()
  const idMunicipio = pathname.split('/')[1];

  const form = useForm<recuperarSenhaData>({
    resolver: zodResolver(recuperarSenhaSchema),
  });

  const onSubmit: SubmitHandler<recuperarSenhaData> = (
    data: IEsqueciMinhaSenha
  ) => {
    esqueciMinhaSenha({
      ...data,
      modulo: "",
    }).then(() => {
      router.push(`/${idMunicipio}/usuario/publico/recuperar-senha`);
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

          <Button type="submit" variant="default" className="px-16 h-12">
            Enviar
          </Button>
        </div>
      </form>
    </Form>
  );
}
