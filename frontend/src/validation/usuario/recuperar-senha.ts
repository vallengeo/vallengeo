import { z } from "zod";

const recuperarSenhaSchema = z
  .object({
    codigoAcesso: z.string({ required_error: "Código não pode ser vazio" }).length(6, {
      message: "O código deve ter 6 dígitos.",
    }),
    senha: z
      .string({ required_error: "Senha é obrigatória" })
      .nonempty("Senha é obrigatória")
      .regex(
        /^(?=.*\d)(?=.*[a-zA-Z]).{6,}$/,
        "A senha deve conter pelo menos uma letra, um número e ter no mínimo 6 caracteres."
      ),
    confirmar_senha: z
      .string({ required_error: "Senha é obrigatória" })
      .nonempty("Senha é obrigatória"),
  })
  .refine(({ senha, confirmar_senha }) => senha === confirmar_senha, {
    message: "A senha não corresponde",
    path: ["confirmar_senha"],
  });

type recuperarSenhaData = z.infer<typeof recuperarSenhaSchema>;

export { recuperarSenhaSchema, type recuperarSenhaData };
