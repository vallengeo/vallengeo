'use client'

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
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
  FormMessage
} from "@/components/ui/form";


const forgotPasswordUserFormSchema = z.object({
  email: z.string({ required_error: "Email é obrigatório" })
    .nonempty("Email é obrigatório")
    .email({
      message: "E-mail inválido, tente: example@example.com"
    }),
})

type forgotPasswordUserFormData = z.infer<typeof forgotPasswordUserFormSchema>

export function FormEsqueciMinhaSenha() {
  const form = useForm<forgotPasswordUserFormData>({
    resolver: zodResolver(forgotPasswordUserFormSchema)
  });

  const onSubmit: SubmitHandler<forgotPasswordUserFormData> = (data) => {
    console.log(data)
  }

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
  )
}