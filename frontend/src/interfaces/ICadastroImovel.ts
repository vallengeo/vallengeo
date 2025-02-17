interface Estado {
  id: number;
  nome: string;
  uf: string;
}

interface Municipio {
  id: number;
  nome: string;
  estado: Estado;
}

interface Endereco {
  id?: number;
  cep: string;
  logradouro: string;
  bairro: string;
  numero: string;
  complemento?: string | null;
  idMunicipio?: number;
  municipio?: Municipio;
}

interface Contato {
  nome: string;
  email: string;
  telefone: string;
  responsavelTecnico: boolean;
  representanteLegal: boolean;
  outro: boolean;
  documento: string;
}

interface Responsavel {
  cpf: string;
  rg: string;
  nome: string;
  telefone: string;
  email: string;
  endereco: Endereco;
  tipoPessoa: "FISICA" | "JURIDICA";
}

interface Representante {
  cnpj?: string;
  razaoSocial?: string;
  telefone: string;
  email: string;
  endereco: Endereco;
  tipoPessoa: "FISICA" | "JURIDICA";
  responsavel?: Responsavel;
  contato: Contato;
  nome?: string;
  cpf?: string;
  rg?: string;
}

interface TipoUso {
  id: number;
}

interface InformacaoImovel {
  tipoUso: TipoUso;
  endereco: Endereco;
}

interface CaracterizacaoImovel {
  setor: string;
  quadra: string;
  lote: string;
  unidade: string;
  areaTerreno: number;
  testadaPrincipal: number;
  fracaoIdeal: number;
  dataInclusao: string;
}

interface Geometria {
  coordinates: number[][][];
  type: "Polygon";
}

interface GeoJson {
  geometry: Geometria;
  type: "Feature";
  properties: Record<string, unknown>;
}

interface Georreferenciamento {
  geoJson: GeoJson;
}

interface Imovel {
  representantes: Representante[];
  informacaoImovel: InformacaoImovel;
  caracterizacaoImovel: CaracterizacaoImovel;
  // georreferenciamento: Georreferenciamento;
}

export default interface ICadastroImovel {
  idGrupo: string;
  imovel: Imovel;
}
