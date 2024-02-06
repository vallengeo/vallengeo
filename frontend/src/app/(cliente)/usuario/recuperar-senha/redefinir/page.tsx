'use client'

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, SubmitHandler } from "react-hook-form";

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

import Support from "@/components/support";

const resetPasswordSchema = z.object({
  password: z.string({ required_error: "Senha é obrigatório" })
    .nonempty("Senha é obrigatório")
    .min(6, "Mínimo 6 dígitos"),
  confirm_password: z.string({ required_error: "Senha é obrigatório" })
    .nonempty("Senha é obrigatório")
    .min(6, "Mínimo 6 dígitos")
})
.refine(({ password, confirm_password}) => password === confirm_password, {
  message: "A senha não corresponde",
  path: ["confirm_password"]
})

type resetPasswordData = z.infer<typeof resetPasswordSchema>

export default function ResetPage() {
  const form = useForm<resetPasswordData>({
    resolver: zodResolver(resetPasswordSchema)
  });

  const onSubmit: SubmitHandler<resetPasswordData> = (data) => {
    console.log(data);
  }

  return (
    <div>
      <h1 className="text-[2rem]/10 font-bold mt-6">Redefinir sua senha</h1>
      <p className="my-6">Informe uma senha válida para prosseguir com o a redefinição de senha.</p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col">
          <div className="flex flex-col mb-2">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="password">Nova senha</FormLabel>
                  <FormControl>
                    <Input
                      id="password"
                      type="password"
                      placeholder="********"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col">
            <FormField
              control={form.control}
              name="confirm_password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="confirm_password">Repetir senha</FormLabel>
                  <FormControl>
                    <Input
                      id="confirm_password"
                      type="password"
                      placeholder="********"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex items-center justify-between mt-6 gap-2 max-[350px]:flex-col-reverse max-[350px]:justify-center">
            <Support/>

            <Button type="submit" variant="default" className="px-16 h-12">
              Cadastrar
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}