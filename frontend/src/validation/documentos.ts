import { z } from 'zod'

const MAX_FILE_SIZE = 1024 * 1024 * 5; // 5 MB
const ACCEPTED_MIME_TYPES = [
  'application/octet-stream',
  'image/vnd.dwg',
  'application/vnd.google-earth.kml+xml',
  'application/pdf'
]
const ACCEPTED_MIME_TYPE_DOCUMENTOS = ['application/zip']

export const documentosFormSchema = z.object({
  habitese: z
    .any()
    .refine((files) => {
      return files?.[0]?.size <= MAX_FILE_SIZE;
    }, 'Tamanho permitido até 5MB.')
    .refine(
      (files) => ACCEPTED_MIME_TYPES.includes(files?.[0]?.type),
      'Formatos permitidos .shp, .dwg, .kml e .pdf.'
    ),
  matricula: z
    .any()
    .refine((files) => {
      return files?.[0]?.size <= MAX_FILE_SIZE;
    }, 'Tamanho permitido até 5MB.')
    .refine(
      (files) => ACCEPTED_MIME_TYPES.includes(files?.[0]?.type),
      'Formatos permitidos .shp, .dwg, .kml e .pdf.'
    ),
  documento: z
    .any()
    .refine((files) => {
      console.log(files)
      return files?.[0]?.size <= MAX_FILE_SIZE;
    }, 'Tamanho permitido até 5MB.')
    .refine(
      (files) => ACCEPTED_MIME_TYPE_DOCUMENTOS.includes(files?.[0]?.type),
      'Formato permitido .zip'
    ),
  outros: z
    .any()
    .refine((files) => {
      return files?.[0]?.size <= MAX_FILE_SIZE;
    }, 'Tamanho permitido até 5MB.')
    .refine(
      (files) => ACCEPTED_MIME_TYPES.includes(files?.[0]?.type),
      'Formatos permitidos .shp, .dwg, .kml e .pdf.'
    )
    .optional()
})

export type documentosFormData = z.infer<typeof documentosFormSchema>