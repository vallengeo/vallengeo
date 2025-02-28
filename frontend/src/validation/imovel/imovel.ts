import { z } from "zod";
import { GeoJSONPolygonSchema } from "zod-geojson";

const informacaoImovel = z.object({
  tipoUso: z.object({
    id: z
      .string({ required_error: "Tipo de uso é obrigatório" })
      .min(1, { message: "Tipo de uso é obrigatório" }),
  }),
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
    idMunicipio: z
      .number({ required_error: "ID do município é obrigatório" })
      .int({ message: "ID do município deve ser um número inteiro" }),
    nomeMunicipio: z.string({
      required_error: "Nome do município é obrigatório",
    }),
    siglaUf: z
      .string({ required_error: "UF do estado é obrigatório" })
      .length(2, { message: "UF deve ter exatamente 2 caracteres" })
      .toUpperCase(),
  }),
});

const caracterizacaoImovel = z.object({
  setor: z
    .string({ required_error: "Setor é obrigatório" })
    .min(1, { message: "Setor não pode estar vazio" }),
  quadra: z
    .string({ required_error: "Quadra é obrigatório" })
    .min(1, { message: "Quadra não pode estar vazia" }),
  lote: z
    .string({ required_error: "Lote é obrigatório" })
    .min(1, { message: "Lote não pode estar vazio" }),
  unidade: z.string().optional(),
  areaTerreno: z
    .number({ required_error: "Área do terreno é obrigatória" })
    .min(1, { message: "Área do terreno é obrigatório" })
    .or(z.string()),
  testadaPrincipal: z
    .number({ required_error: "Testada é obrigatória" })
    .min(1, { message: "Testada é obrigatório" })
    .or(z.string()),
  fracaoIdeal: z.number().or(z.string()).optional(),
  dataInclusao: z.date(),
});

const geometrySchema = z.object({
  type: z.literal("Polygon"),
  coordinates: z.array(z.array(z.tuple([z.number(), z.number()]))).optional(),
});

const geoJson = z.object({
  geometry: geometrySchema,
  type: z.string(),
  properties: z.object({}),
});

const georreferenciamento = z.object({
  geoJson: geoJson,
});

export const imovelFormSchema = z.object({
  informacaoImovel,
  caracterizacaoImovel,
  georreferenciamento,
});

export type imovelFormData = z.infer<typeof imovelFormSchema>;
