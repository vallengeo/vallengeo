import z from "zod";

const observacaoSchema = z.object({
  titulo: z
    .string({ required_error: "Assunto é obrigatório" })
    .min(1, { message: "Assunto não pode estar vazia" }),
  descricao: z
    .string({ required_error: "Descrição é obrigatório" })
    .min(1, { message: "Descrição não pode estar vazia" }),
  idProcesso: z.string(),
});

type observacaoData = z.infer<typeof observacaoSchema>;

export { observacaoSchema, type observacaoData };
