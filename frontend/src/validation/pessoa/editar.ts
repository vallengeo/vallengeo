import { z } from "zod";

const estadoSchema = z.object({
  id: z
    .number({ required_error: "ID do estado é obrigatório" })
    .int({ message: "ID do estado deve ser um número inteiro" }),
  nome: z.string({ required_error: "Nome do estado é obrigatório" }),
  uf: z
    .string({ required_error: "UF do estado é obrigatório" })
    .length(2, { message: "UF deve ter exatamente 2 caracteres" })
    .toUpperCase(),
});

const municipioSchema = z.object({
  id: z
    .number({ required_error: "ID do município é obrigatório" })
    .int({ message: "ID do município deve ser um número inteiro" }),
  nome: z
    .string({ required_error: "Nome do município é obrigatório" })
    .min(1, { message: "Cidade é obrigatório" }),
  estado: estadoSchema,
});

const enderecoSchema = z.object({
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
  municipio: municipioSchema,
});

const contatoSchema = z.object({
  nome: z.string(),
  email: z.string(),
  telefone: z.string(),
  documento: z.string(),
  responsavelTecnico: z.boolean(),
  representanteLegal: z.boolean(),
  outro: z.boolean(),
});

const pessoaSchema = z.array(
  z.object({
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
    tipoPessoa: z.enum(["FISICA", "JURIDICA"]),
    endereco: enderecoSchema,
    contato: contatoSchema,
  })
);

type pessoaData = z.infer<typeof pessoaSchema>;

export { pessoaSchema, type pessoaData };
