interface Processo {
  id: string;
  protocolo: string;
  ultimaAtualizacao: string;
  ultimaAtualizacaoFormatada: string;
  situacao: string;
  dataCadastroFormatada: string;
}

interface DocumentosEnviados {
  id: string;
  nome: string;
  extensao: string;
  tamanho: number;
  dataEnvio: string;
  dataEnvioFormatada: string;
}

interface Historicos {
  id: number;
  titulo: string;
  descricao: string;
  dataCadastro: string;
  documentosEnviados: DocumentosEnviados[];
  dataCadastroFormatada: string;
}

export default interface IProtocolo {
  id: number;
  inscricaoImobiliaria: string;
  processo: Processo;
  historicos: Historicos[];
}
