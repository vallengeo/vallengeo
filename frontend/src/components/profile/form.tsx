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

const resetPasswordSchema = z.object({
  password: z.string({ required_error: "Senha é obrigatório" })
    .nonempty("Senha é obrigatório")
    .min(6, "Mínimo 6 dígitos"),
  confirm_password: z.string({ required_error: "Senha é obrigatório" })
    .nonempty("Senha é obrigatório")
    .min(6, "Mínimo 6 dígitos")
})
  .refine(({ password, confirm_password }) => password === confirm_password, {
    message: "A senha não corresponde",
    path: ["confirm_password"]
  })

type resetPasswordData = z.infer<typeof resetPasswordSchema>

export function FormRedefinirSenha() {
  const form = useForm<resetPasswordData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit: SubmitHandler<resetPasswordData> = (data) => {
    console.log(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col">
        <div className="flex flex-col mb-2">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="password" className="font-semibold">Nova senha</FormLabel>
                <FormControl>
                  <Input
                    id="password"
                    type="password"
                    placeholder="********"
                    {...field}
                    className="max-w-none bg-input border-0"
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
                <FormLabel htmlFor="confirm_password" className="font-semibold">Repetir senha</FormLabel>
                <FormControl>
                  <Input
                    id="confirm_password"
                    type="password"
                    placeholder="********"
                    {...field}
                    className="max-w-none bg-input border-0"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex items-center justify-end mt-6 gap-4">
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              form.reset({
                password: "",
                confirm_password: "",
              })
            }}
          >
            Limpar
          </Button>

          <Button type="submit" variant="default">
            Salvar
          </Button>
        </div>
      </form>
    </Form>
  )
}