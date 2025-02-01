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
  nome: z.string({ required_error: "Nome do município é obrigatório" }),
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
  nome: z.string().optional(),
  email: z.string().optional(),
  telefone: z.string().optional(),
  documento: z.string().optional(),
  responsavelTecnico: z.boolean().optional(),
  representanteLegal: z.boolean().optional(),
  outro: z.boolean().optional(),
});

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
      endereco: enderecoSchema,
      contato: contatoSchema,
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
        if (data.contato.representanteLegal) {
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
          'Todos os campos são obrigatórios para "Responsável Legal" ou "Outro".',
        path: ["contato"],
      }
    )
);

export const dadosPessoaisSchema = z.object({
  idGrupo: z.string(),
  representantes: representanteSchema,
});

export const dadosEmpresaSchema = z.object({
  idGrupo: z.string(),
  representantes: representanteSchema,
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
    endereco: enderecoSchema,
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
});

export type dadosPessoaisData = z.infer<typeof dadosPessoaisSchema>;
export type dadosEmpresaData = z.infer<typeof dadosEmpresaSchema>;
