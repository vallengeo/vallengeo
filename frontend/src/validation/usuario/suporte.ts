import { z } from "zod";

export const suporteFormSchema = z.object({
  nome: z.string({ required_error: "Nome é obrigatório" })
    .nonempty("Nome é obrigatório"),
  email: z.string({ required_error: "Email é obrigatório" })
    .nonempty("E-mail é obrigatório")
    .email({
      message: "E-mail inválido, tente: exemplo@exemplo.com"
    }),
  telefone: z.string({ required_error: "Telefone é obrigatório" })
    .nonempty("Telefone é obrigatório"),
  mensagem: z.string({ required_error: "Mensagem é obrigatório" })
    .nonempty("Mensagem é obrigatório")
});

export type suporteFormData = z.infer<typeof suporteFormSchema>
