import z from "zod";

const documentosSchema = z.object({
  idTipoDocumento: z.number(),
  nomeTemporario: z.string(),
  nomeOriginal: z.string(),
  dataEnvio: z.date(),
});

const arquivarSchema = z.object({
  titulo: z
    .string()
    .min(3, { message: "Campo obrigatório" })
    .nonempty({ message: "Campo obrigatório" }),
  descricao: z
    .string()
    .min(3, { message: "Campo obrigatório" })
    .nonempty({ message: "Campo obrigatório" }),
  idProcesso: z.string(),
  documentos: z
    .array(documentosSchema)
    .nonempty({ message: "Campo obrigatório" }),
  confirmacao: z.boolean().refine((val) => val === true, {
    message: "Marque essa opção",
  }),
});

type arquivarData = z.infer<typeof arquivarSchema>;

export { arquivarSchema, type arquivarData };
