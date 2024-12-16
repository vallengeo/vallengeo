interface Processo {
  id: string;
  protocolo: string;
  ultimaAtualizacao: string;
  ultimaAtualizacaoFormatada: string;
  situacao: string;
}

interface TipoUso {
  id: number;
  nome: string;
}

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
  id: number;
  cep: string;
  logradouro: string;
  bairro: string;
  numero: string;
  complemento: string;
  municipio: Municipio;
}

interface InformacaoImovel {
  id: number;
  tipoUso: TipoUso;
  endereco: Endereco;
}

export interface ConteudoItem {
  id: number;
  inscricaoImobiliaria: string;
  processo: Processo;
  informacaoImovel: InformacaoImovel;
}

export default interface IImovelCadastrados {
  conteudo: ConteudoItem[];
  total: number;
  totalPaginas: number;
  pagina: number;
  itensPorPagina: number;
}
