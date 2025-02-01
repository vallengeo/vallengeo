import { z } from "zod";

const resetPasswordSchema = z
  .object({
    password: z
      .string({ required_error: "Senha é obrigatório" })
      .nonempty("Senha é obrigatório")
      .min(6, "Mínimo 6 dígitos"),
    confirm_password: z
      .string({ required_error: "Senha é obrigatório" })
      .nonempty("Senha é obrigatório")
      .min(6, "Mínimo 6 dígitos"),
  })
  .refine(({ password, confirm_password }) => password === confirm_password, {
    message: "A senha não corresponde",
    path: ["confirm_password"],
  });

type resetPasswordData = z.infer<typeof resetPasswordSchema>;

export { resetPasswordSchema, type resetPasswordData };
