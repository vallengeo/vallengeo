import { z } from "zod";

export const documentosFormSchema = z.object({
  idProcesso: z.string().optional(),
  documentos: z.array(
    z
      .object({
        idTipoDocumento: z.number().optional(),
        nomeTemporario: z.string().optional(),
        nomeOriginal: z.string().optional(),
        dataEnvio: z.string().optional(),
        file: z.string().optional(),
        obrigatorio: z.boolean().optional(),
        formatos: z.array(z.string())
      })
      .refine(
        (data) => {
          if (data.obrigatorio) {
            return (
              !!data.nomeTemporario && !!data.nomeOriginal && !!data.dataEnvio
            );
          }
          return true;
        },
        {
          message: "O upload do documento é obrigatório",
          path: ["file"],
        }
      )
      .refine(
        (data) => {
          if (!data.file) return true; // Se não tiver arquivo, não valida o formato

          const extensao = data.nomeOriginal ? `.${data.nomeOriginal.split(".").pop()?.toLowerCase()}` : "";
          return data.formatos.includes(extensao || "");
        },
        {
          message: "Formato de arquivo inválido",
          path: ["file"],
        }
      )
  ),
});

export type documentosFormData = z.infer<typeof documentosFormSchema>;
