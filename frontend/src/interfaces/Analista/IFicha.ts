export interface Processo {
  id: string;
  protocolo: string;
  imovel: Imovel;
  ultimaAtualizacaoFormatada?: string;
  situacao?: string;
}

export interface Imovel {
  id: number;
  inscricaoImobiliaria: string;
  representantes: Representante[];
  informacaoImovel: InformacaoImovel;
  caracterizacaoImovel: CaracterizacaoImovel;
}

export interface Representante {
  id: string;
  email: string;
  telefone: string;
  endereco: Endereco;
  contato: Contato;
  tipoPessoa: "FISICA" | "JURIDICA";
  nome?: string;
  cpf?: string;
  rg?: string;
  responsavel?: Responsavel;
}

interface Responsavel {
  cpf: string;
  rg: string;
  nome: string;
  telefone: string;
  email: string;
  endereco: EnderecoResponsavel;
  tipoPessoa: "FISICA" | "JURIDICA";
}

interface EnderecoResponsavel {
  logradouro: string;
  bairro: string;
  idMunicipio: number;
  cep: string;
  numero: string;
}

export interface Endereco {
  id: number;
  cep: string;
  logradouro: string;
  bairro: string;
  numero: string;
  complemento: string;
  municipio: Municipio;
}

interface Municipio {
  id: number;
  nome: string;
  estado: Estado;
}

interface Estado {
  id: number;
  nome: string;
  uf: string;
}

interface Contato {
  nome: string;
  email: string;
  telefone: string;
  documento: string;
  responsavelTecnico: boolean;
  representanteLegal: boolean;
  outro: boolean;
}

interface InformacaoImovel {
  id: number;
  tipoUso: TipoUso;
  endereco: Endereco;
}

interface TipoUso {
  id: string;
  nome: string;
}

export interface CaracterizacaoImovel {
  setor: string;
  quadra: string;
  lote: string;
  unidade: string;
  areaTerreno: number;
  testadaPrincipal: number;
  fracaoIdeal: number;
  dataInclusao: Date;
  testadaPrincipalFormatada: string;
  fracaoIdealFormatada: string;
  areaTerrenoFormatada: string;
  dataInclusaoFormatada: string;
}

interface Properties {
  editable: boolean;
  id: string;
}

interface Geometria {
  type: "Polygon";
  coordinates?: number[][][];
  properties: Properties;
}

interface Documento {
  id: string;
  nome: string;
  extensao: string;
  tamanho: number;
  dataEnvio: string;
  dataEnvioFormatada: string;
}

interface DocumentoEnviado {
  id: number;
  titulo: string;
  documentos: Documento[];
}

export interface Historico {
  id: number;
  titulo: string;
  descricao: string;
  dataCadastro: string;
  dataCadastroFormatada: string;
  documentosEnviados: DocumentoEnviado[];
}

export default interface IFicha {
  id: number;
  inscricaoImobiliaria: string;
  processo: Processo;
  representantes: Representante[];
  informacaoImovel: InformacaoImovel;
  caracterizacaoImovel: CaracterizacaoImovel;
  geometria: Geometria;
  documentosEnviados: DocumentoEnviado[];
  historicos: Historico[];
}
