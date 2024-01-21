import { z } from "zod";
import { estados } from "@/validation/estados"

export const representanteFormSchema = z.object({
    nome: z
      .string({ required_error: "Nome é obrigatório" }),
    cpf: z
      .string({ required_error: "CPF é obrigatório" }),
    rg: z
      .string({ required_error: "RG é obrigatório" }),
    telefone: z
      .string({ required_error: "Telefone é obrigatório" }),
    email: z
      .string({ required_error: "RG é obrigatório" })
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
    tipo_contato: z
      .enum(["outro", "representante"]).optional(),
    nome_contato: z
      .string({ required_error: "Nome é obrigatório" }),
    telefone_contato: z
      .string({ required_error: "Telefone é obrigatório" }),
  })

  export type representanteFormData = z.infer<typeof representanteFormSchema>