import { z } from "zod";

export const documentosFormSchema = z.object({
  documentos: z.array(
    z.object({
      idTipoDocumento: z
        .number({ message: "Campo obrigatório" })
        .min(1, "Campo obrigatório"),
    })
  ),
});

export type documentosFormData = z.infer<typeof documentosFormSchema>;
