import { z } from 'zod'

const MAX_FILE_SIZE = 1024 * 1024 * 50; // 50 MB
const ACCEPTED_MIME_TYPES = ['image/vnd.dwg', 'application/pdf'];

export const documentosFormSchema = z.object({
  documentos: z.array(
    z.object({
      idTipoDocumento: z.number(),
    })
  )
})

export type documentosFormData = z.infer<typeof documentosFormSchema>
