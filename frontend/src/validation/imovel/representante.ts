import { z } from "zod";
import { estados } from "@/validation/estados"

export const dadosPessoaisSchema = z.object({
  nome: z
    .string({ required_error: "Nome é obrigatório" })
    .min(1, { message: "Nome é obrigatório" }),
  cpf: z
    .string({ required_error: "CPF é obrigatório" })
    .min(1, { message: "CPF é obrigatório" }),
  rg: z
    .string({ required_error: "RG é obrigatório" })
    .min(1, { message: "RG é obrigatório" }),
  telefone: z
    .string({ required_error: "Telefone é obrigatório" })
    .min(1, { message: "Telefone é obrigatório" }),
  email: z
    .string({ required_error: "Email é obrigatório" })
    .email({ message: "E-mail inválido, tente: example@example.com" }),
  cep: z
    .string({ required_error: "CEP é obrigatório" })
    .min(1, { message: "CEP é obrigatório" }),
  endereco: z
    .string({ required_error: "Endereço é obrigatório" })
    .min(1, { message: "Endereço é obrigatório" }),
  numero: z
    .string({ required_error: "Número é obrigatório" })
    .min(1, { message: "Número é obrigatório" }),
  complemento: z.string().optional(),
  bairro: z
    .string({ required_error: "Bairro é obrigatório" })
    .min(1, { message: "Bairro é obrigatório" }),
  cidade: z
    .string({ required_error: "Cidade é obrigatório" })
    .min(1, { message: "Cidade é obrigatório" }),
  uf: z
    .enum(estados, {
      errorMap: () => ({ message: "Estado é obrigatório" })
    }),
})

export type dadosPessoaisData = z.infer<typeof dadosPessoaisSchema>

export const dadosEmpresaSchema = z.object({
  razao_social: z
    .string({ required_error: "Razão social é obrigatório" })
    .min(1, { message: "Razão social é obrigatório" }),
  cnpj: z
    .string({ required_error: "CNPJ é obrigatório" })
    .min(1, { message: "CNPJ é obrigatório" }),
  email_empresa: z
    .string({ required_error: "Email é obrigatório" })
    .email({ message: "E-mail inválido, tente: example@example.com" }),
  cep_empresa: z
    .string({ required_error: "CEP é obrigatório" })
    .min(1, { message: "CEP é obrigatório" }),
  endereco_empresa: z
    .string({ required_error: "Endereço é obrigatório" })
    .min(1, { message: "Endereço é obrigatório" }),
  numero_empresa: z
    .string({ required_error: "Número é obrigatório" })
    .min(1, { message: "Número é obrigatório" }),
  complemento_empresa: z.string().optional(),
  bairro_empresa: z
    .string({ required_error: "Bairro é obrigatório" })
    .min(1, { message: "Bairro é obrigatório" }),
  cidade_empresa: z
    .string({ required_error: "Cidade é obrigatório" })
    .min(1, { message: "Cidade é obrigatório" }),
  uf_empresa: z
    .enum(estados, {
      errorMap: () => ({ message: "Estado é obrigatório" })
    }),
})

export type dadosEmpresaData = z.infer<typeof dadosEmpresaSchema>

export const contatoSchema = z.object({
  tipo_contato: z.enum(["representante", "responsavel", "outro"]),
  nome_contato: z
    .string({ required_error: "Nome é obrigatório" })
    .min(1, { message: "Nome é obrigatório" }),
  email_contato: z
    .string({ required_error: "E-mail é obrigatório" })
    .email({ message: "E-mail inválido, tente: example@example.com" }),
  telefone_contato: z
    .string({ required_error: "Telefone é obrigatório" })
    .min(1, { message: "Telefone é obrigatório" }),
  cnpj_contato: z
    .string({ required_error: "CPNJ é obrigatório" })
    .min(1, { message: "CPNJ é obrigatório" }),
  cpf_contato: z
    .string({ required_error: "CPF é obrigatório" })
    .min(1, { message: "CPF é obrigatório" }),
})

export type contatoData = z.infer<typeof contatoSchema>

export const representantePFSchema = dadosPessoaisSchema.merge(contatoSchema)
export type representantePFData = z.infer<typeof representantePFSchema>

export const representantePJSchema = dadosPessoaisSchema.merge(dadosEmpresaSchema).merge(contatoSchema)
export type representantePJData = z.infer<typeof representantePJSchema>
