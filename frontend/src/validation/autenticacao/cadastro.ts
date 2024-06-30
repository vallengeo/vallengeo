import { z } from "zod";

export const cadastroFormSchema = z.object({
  nome_completo: z
    .string({ required_error: "Nome é obrigatório" })
    .nonempty("Nome é obrigatório"),
  email: z
    .string({ required_error: "Email é obrigatório" })
    .nonempty("E-mail é obrigatório")
    .email({
      message: "E-mail inválido, tente: exemplo@exemplo.com"
    }),
  cpf: z
    .string({ required_error: "CPF é obrigatório" })
    .nonempty("CPF é obrigatório"),
  telefone: z
    .string({ required_error: "Telefone é obrigatório" })
    .nonempty("Telefone é obrigatório"),
  senha: z
    .string({ required_error: "Senha é obrigatório" })
    .nonempty("Senha é obrigatório")
    .min(6, "Mínimo 6 dígitos"),
  confirmar_senha: z
    .string({ required_error: "Senha é obrigatório" })
    .nonempty("Senha é obrigatório")
    .min(6, "Mínimo 6 dígitos")
}).refine(({ senha, confirmar_senha }) => senha === confirmar_senha, {
  message: "A senha não corresponde",
  path: ["confirmar_senha"]
})

export type cadastroFormData = z.infer<typeof cadastroFormSchema>
