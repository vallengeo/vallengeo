import { z } from "zod"
import { estados } from "@/validation/estados"

export const grupos = [
  'teste',
] as const

export type Grupos = typeof grupos[number]

export const mapearGrupos: { [key in Grupos]: string } = {
  teste: "Teste",
}

export const divisoes = [
  'teste',
] as const

export type Divisoes = typeof divisoes[number]

export const mapearDivisoes: { [key in Divisoes]: string } = {
  teste: "Teste",
}

export const imovelFormSchema = z.object({
  grupo: z.enum(grupos, {
      errorMap: () => ({ message: "Tipo do grupo é obrigatório" })
    }),
  divisao: z.enum(divisoes, {
      errorMap: () => ({ message: "Tipo de divisão é obrigatório" })
    }),
  imovel_cep: z
    .string({ required_error: "CEP é obrigatório" }),
  imovel_endereco: z
    .string({ required_error: "Endereço é obrigatório" }),
  imovel_numero: z
    .string({ required_error: "Número é obrigatório" }),
  imovel_complemento: z
    .string().optional(),
  imovel_bairro: z
    .string({ required_error: "Bairro é obrigatório" }),
  imovel_cidade: z
    .string({ required_error: "Cidade é obrigatório" }),
  imovel_uf: z
    .enum(estados, {
      errorMap: () => ({ message: "Estado é obrigatório" })
    }),
  setor: z
    .string({ required_error: "Setor é obrigatório" }),
  quadra: z
    .string({ required_error: "Quadra é obrigatório" }),
  lote: z
    .string({ required_error: "Lote é obrigatório" }),
  unidade: z
    .string().optional(),
  area_terreno: z
    .string({ required_error: "Área do terreno é obrigatório" }),
  testada: z
    .string({ required_error: "Testada é obrigatório" }),
  fracao: z
    .string().optional(),
  data_inclusao: z.date({ required_error: "Data é obrigatório" }),
  observacao: z.string().optional(),
})

export type imovelFormData = z.infer<typeof imovelFormSchema>