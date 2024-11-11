import { z } from "zod";
import { estados } from "@/validation/estados";

const representanteSchema = z.array(
  z
    .object({
      email: z
        .string({ required_error: "Email é obrigatório" })
        .email({ message: "E-mail inválido, tente: example@example.com" }),
      telefone: z
        .string({ required_error: "Telefone é obrigatório" })
        .min(1, { message: "Telefone é obrigatório" }),
      tipoPessoa: z.enum(["FISICA", "JURIDICA"]),
      endereco: z.object({
        cep: z
          .string({ required_error: "CEP é obrigatório" })
          .min(1, { message: "CEP é obrigatório" }),
        logradouro: z
          .string({ required_error: "Endereço é obrigatório" })
          .min(1, { message: "Endereço é obrigatório" }),
        bairro: z
          .string({ required_error: "Bairro é obrigatório" })
          .min(1, { message: "Bairro é obrigatório" }),
        numero: z
          .string({ required_error: "Número é obrigatório" })
          .min(1, { message: "Número é obrigatório" }),
        complemento: z.string().optional(),
        cidade: z
          .string({ required_error: "Cidade é obrigatório" })
          .min(1, { message: "Cidade é obrigatório" }),
        uf: z.enum(['', ...estados], {
          errorMap: () => ({ message: "Estado é obrigatório" }),
        }),
        idMunicipio: z.number(),
      }),
      contato: z.object({
        tipo: z.enum(["representante", "responsavel", "outro"]),
        nome: z.string().optional(),
        email: z.string().optional(),
        telefone: z.string().optional(),
        documento: z.string().optional(),
      }),
      nome: z
        .string({ required_error: "Nome é obrigatório" })
        .min(1, { message: "Nome é obrigatório" }),
      cpf: z
        .string({ required_error: "CPF é obrigatório" })
        .min(1, { message: "CPF é obrigatório" }),
      rg: z
        .string({ required_error: "RG é obrigatório" })
        .min(1, { message: "RG é obrigatório" }),
    })
    .refine(
      (data) => {
        if (data.contato.tipo === "representante") {
          return true;
        } else {
          return (
            data.contato.nome &&
            data.contato.nome.length > 0 &&
            data.contato.email &&
            data.contato.email.length > 0 &&
            data.contato.telefone &&
            data.contato.telefone.length > 0 &&
            data.contato.documento &&
            data.contato.documento.length > 0
          );
        }
      },
      {
        message:
          'Todos os campos são obrigatórios para "responsavel" ou "outro".',
        path: ["contato"],
      }
    )
);

export const dadosPessoaisSchema = z.object({
  representantes: representanteSchema,
});

export type dadosPessoaisData = z.infer<typeof dadosPessoaisSchema>;

export const dadosEmpresaSchema = z.object({
  razaoSocial: z
    .string({ required_error: "Razão social é obrigatório" })
    .min(1, { message: "Razão social é obrigatório" }),
  cnpj: z
    .string({ required_error: "CNPJ é obrigatório" })
    .min(1, { message: "CNPJ é obrigatório" }),
  responsavel: z.object({
    email: z
      .string({ required_error: "Email é obrigatório" })
      .email({ message: "E-mail inválido, tente: example@example.com" }),
    telefone: z
      .string({ required_error: "Telefone é obrigatório" })
      .min(1, { message: "Telefone é obrigatório" }),
    tipoPessoa: z.enum(["FISICA", "JURIDICA"]),
    endereco: z.object({
      cep: z
        .string({ required_error: "CEP é obrigatório" })
        .min(1, { message: "CEP é obrigatório" }),
      logradouro: z
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
      uf: z.enum(['', ...estados], {
        errorMap: () => ({ message: "Estado é obrigatório" }),
      }),
      idMunicipio: z.number(),
    }),
    nome: z
      .string({ required_error: "Nome é obrigatório" })
      .min(1, { message: "Nome é obrigatório" }),
    cpf: z
      .string({ required_error: "CPF é obrigatório" })
      .min(1, { message: "CPF é obrigatório" }),
    rg: z
      .string({ required_error: "RG é obrigatório" })
      .min(1, { message: "RG é obrigatório" }),
  }),
  representantes: representanteSchema,
});

export type dadosEmpresaData = z.infer<typeof dadosEmpresaSchema>;
