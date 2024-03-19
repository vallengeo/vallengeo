'use client'

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, SubmitHandler } from "react-hook-form";

import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"

const recoveryPasswordUserFormSchema = z.object({
  code: z.string({ required_error: "Código não pode ser vazio" })
    .length(6, {
      message: 'O código deve ter 6 dígitos.'
    })
    .refine(data => /^\d+$/.test(data), {
      message: 'O código deve conter apenas números.',
    }),
})

type recoveryPasswordUserFormData = z.infer<typeof recoveryPasswordUserFormSchema>

export function FormRecuperarSenha() {
  const form = useForm<recoveryPasswordUserFormData>({
    resolver: zodResolver(recoveryPasswordUserFormSchema)
  });

  const onSubmit: SubmitHandler<recoveryPasswordUserFormData> = (data) => {
    console.log(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col">
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="email">Código</FormLabel>
                <FormControl>
                  <Input
                    id="code"
                    type="text"
                    maxLength={6}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  )
}