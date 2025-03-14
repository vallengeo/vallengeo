import { z } from "zod";

const esqueciMinhaSenhaSchema = z.object({
  email: z
    .string({ required_error: "Email é obrigatório" })
    .nonempty("Email é obrigatório")
    .email({
      message: "E-mail inválido, tente: example@example.com",
    }),
  modulo: z.string()
});

type esqueciMinhaSenhaData = z.infer<typeof esqueciMinhaSenhaSchema>;

export {
  esqueciMinhaSenhaSchema,
  type esqueciMinhaSenhaData
}
