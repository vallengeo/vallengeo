import { z } from 'zod'

export const documentosFormSchema = z.object({
  documentos: z.array(
    z.object({
      idTipoDocumento: z.number(),
    })
  )
})

export type documentosFormData = z.infer<typeof documentosFormSchema>
