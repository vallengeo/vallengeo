import { z } from "zod";

export const loginFormSchema = z.object({
  email: z.string({ required_error: "Email é obrigatório" })
    .nonempty("E-mail é obrigatório")
    .email({
      message: "E-mail inválido, tente: example@example.com"
    }),
  password: z.string({ required_error: "Senha é obrigatório" })
    .nonempty("Senha é obrigatório")
    .min(8, "Mínimo 8 dígitos")
})

export type loginFormData = z.infer<typeof loginFormSchema>
