import { z } from "zod";

const recuperarSenhaSchema = z.object({
  email: z
    .string({ required_error: "Email é obrigatório" })
    .nonempty("Email é obrigatório")
    .email({
      message: "E-mail inválido, tente: example@example.com",
    }),
  modulo: z.string()
});

type recuperarSenhaData = z.infer<typeof recuperarSenhaSchema>;

export {
  recuperarSenhaSchema,
  type recuperarSenhaData
}
