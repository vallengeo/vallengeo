import { z } from "zod";
import { estados } from "@/validation/estados"

export const representanteFormSchema = z.object({
  razao_social: z
    .string({ required_error: "Razão social é obrigatório" }),
  cnpj: z
    .string({ required_error: "CNPJ é obrigatório" }),
  telefone: z
    .string({ required_error: "Telefone é obrigatório" }),
  email: z
    .string({ required_error: "Email é obrigatório" })
    .email({ message: "E-mail inválido, tente: example@example.com" }),
  cep: z
    .string({ required_error: "CEP é obrigatório" }),
  endereco: z
    .string({ required_error: "Endereço é obrigatório" }),
  numero: z
    .string({ required_error: "Número é obrigatório" }),
  complemento: z
    .string().optional(),
  bairro: z
    .string({ required_error: "Bairro é obrigatório" }),
  cidade: z
    .string({ required_error: "Cidade é obrigatório" }),
  uf: z
    .enum(estados, {
      errorMap: () => ({ message: "Estado é obrigatório" })
    }),
  nome_representante: z
    .string({ required_error: "Nome é obrigatório" }),
  cpf_representante: z
    .string({ required_error: "CPF é obrigatório" }),
  rg_representante: z
    .string({ required_error: "RG é obrigatório" }),
  telefone_representante: z
    .string({ required_error: "Telefone é obrigatório" }),
  email_representante: z
    .string({ required_error: "RG é obrigatório" })
    .email({ message: "E-mail inválido, tente: example@example.com" }),
  cep_representante: z
    .string({ required_error: "CEP é obrigatório" }),
  endereco_representante: z
    .string({ required_error: "Endereço é obrigatório" }),
  numero_representante: z
    .string({ required_error: "Número é obrigatório" }),
  complemento_representante: z
    .string().optional(),
  bairro_representante: z
    .string({ required_error: "Bairro é obrigatório" }),
  cidade_representante: z
    .string({ required_error: "Cidade é obrigatório" }),
  uf_representante: z
    .enum(estados, {
      errorMap: () => ({ message: "Estado é obrigatório" })
    }),
  tipo_contato: z
    .enum(["outro", "representante"]).optional(),
  nome_contato: z
    .string({ required_error: "Nome é obrigatório" }),
  telefone_contato: z
    .string({ required_error: "Telefone é obrigatório" }),
})

export type representanteFormData = z.infer<typeof representanteFormSchema>