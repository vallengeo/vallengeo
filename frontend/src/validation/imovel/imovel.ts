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
    municipio: municipioSchema,
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
    .string({ required_error: "Área do terreno é obrigatória" })
    .min(1, { message: "Área do terreno é obrigatório" }),
  testadaPrincipal: z
    .string({ required_error: "Testada é obrigatória" })
    .min(1, { message: "Testada é obrigatório" }),
  fracaoIdeal: z.string().optional(),
  dataInclusao: z.date(),
});

const geometriaSchema = z.object({
  coordinates: z.array(
    z.array(
      z
        .array(
          z.number({
            required_error: "As coordenadas devem ser números",
          })
        )
        .min(4, {
          message:
            "Cada anel deve ter pelo menos 4 vértices para formar um polígono fechado",
        })
    )
  ),
  type: z.literal("Polygon", {
    errorMap: () => ({ message: "O tipo de geometria deve ser 'Polygon'" }),
  }),
});

const geoJsonSchema = z.object({
  geometry: geometriaSchema,
  type: z.literal("Feature", {
    errorMap: () => ({ message: "O tipo de GeoJSON deve ser 'Feature'" }),
  }),
  properties: z.record(z.unknown(), {
    required_error: "As propriedades devem ser um objeto",
  }),
});

const georreferenciamento = z.object({
  geoJson: geoJsonSchema,
});

export const imovelFormSchema = z.object({
  informacaoImovel,
  caracterizacaoImovel,
  // georreferenciamento,
});

export type imovelFormData = z.infer<typeof imovelFormSchema>;
