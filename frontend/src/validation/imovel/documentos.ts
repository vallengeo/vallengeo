import { z } from 'zod'

const MAX_FILE_SIZE = 1024 * 1024 * 50; // 50 MB
const ACCEPTED_MIME_TYPES = ['image/vnd.dwg', 'application/pdf'];

export const documentosFormSchema = z.object({
  matricula: z
    .any()
    .refine((files) => {
      return files?.[0]?.size <= MAX_FILE_SIZE;
    }, 'Tamanho permitido até 50MB.')
    .refine(
      (files) => ACCEPTED_MIME_TYPES.includes(files?.[0]?.type),
      'Formatos permitidos .dwg e .pdf.'
    ),
  documento_proprietario: z
    .any()
    .refine((files) => {
      return files?.[0]?.size <= MAX_FILE_SIZE;
    }, 'Tamanho permitido até 50MB.')
    .refine(
      (files) => 'application/pdf'.includes(files?.[0]?.type),
      'Formato permitido .pdf.'
    ),
  certidao_nascimento_proprietario: z
    .any()
    .refine((files) => {
      return files?.[0]?.size <= MAX_FILE_SIZE;
    }, 'Tamanho permitido até 50MB.')
    .refine(
      (files) => 'application/pdf'.includes(files?.[0]?.type),
      'Formatos permitido .pdf.'
    ),
  certidao_casamento_proprietario: z
    .any()
    .refine((files) => {
      return files?.[0]?.size <= MAX_FILE_SIZE;
    }, 'Tamanho permitido até 50MB.')
    .refine(
      (files) => 'application/pdf'.includes(files?.[0]?.type),
      'Formato permitido .pdf.'
    ),
  comprovante_residencia_proprietario: z
    .any()
    .refine((files) => {
      return files?.[0]?.size <= MAX_FILE_SIZE;
    }, 'Tamanho permitido até 50MB.')
    .refine(
      (files) => 'application/pdf'.includes(files?.[0]?.type),
      'Formato permitido .pdf.'
    ),
  aprovacao_habitese: z
    .any()
    .refine((files) => {
      return files?.[0]?.size <= MAX_FILE_SIZE;
    }, 'Tamanho permitido até 50MB.')
    .refine(
      (files) => 'application/pdf'.includes(files?.[0]?.type),
      'Formato permitido .pdf.'
    ),
  habitese_imovel: z
    .any()
    .refine((files) => {
      return files?.[0]?.size <= MAX_FILE_SIZE;
    }, 'Tamanho permitido até 50MB.')
    .refine(
      (files) => 'application/pdf'.includes(files?.[0]?.type),
      'Formato permitido .pdf.'
    ),
  projeto_arquitetonico: z
    .any()
    .refine((files) => {
      return files?.[0]?.size <= MAX_FILE_SIZE;
    }, 'Tamanho permitido até 50MB.')
    .refine(
      (files) => 'application/pdf'.includes(files?.[0]?.type),
      'Formato permitido .pdf.'
    )
    .optional(),
  procuracao: z
    .any()
    .refine((files) => {
      return files?.[0]?.size <= MAX_FILE_SIZE;
    }, 'Tamanho permitido até 50MB.')
    .refine(
      (files) => 'application/pdf'.includes(files?.[0]?.type),
      'Formato permitido .pdf.'
    )
    .optional(),
  responsavel_legal: z
    .any()
    .refine((files) => {
      return files?.[0]?.size <= MAX_FILE_SIZE;
    }, 'Tamanho permitido até 50MB.')
    .refine(
      (files) => 'application/pdf'.includes(files?.[0]?.type),
      'Formato permitido .pdf.'
    )
    .optional(),
  iptu: z
    .any()
    .refine((files) => {
      return files?.[0]?.size <= MAX_FILE_SIZE;
    }, 'Tamanho permitido até 50MB.')
    .refine(
      (files) => 'application/pdf'.includes(files?.[0]?.type),
      'Formato permitido .pdf.'
    )
    .optional(),
  eiv: z
    .any()
    .refine((files) => {
      return files?.[0]?.size <= MAX_FILE_SIZE;
    }, 'Tamanho permitido até 50MB.')
    .refine(
      (files) => 'application/pdf'.includes(files?.[0]?.type),
      'Formato permitido .pdf.'
    )
    .optional(),
  rit: z
    .any()
    .refine((files) => {
      return files?.[0]?.size <= MAX_FILE_SIZE;
    }, 'Tamanho permitido até 50MB.')
    .refine(
      (files) => 'application/pdf'.includes(files?.[0]?.type),
      'Formato permitido .pdf.'
    )
    .optional(),
})

export type documentosFormData = z.infer<typeof documentosFormSchema>