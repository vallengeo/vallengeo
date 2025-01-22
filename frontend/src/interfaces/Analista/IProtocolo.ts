interface Processo {
  id: string;
  protocolo: string;
  ultimaAtualizacao: string;
  ultimaAtualizacaoFormatada: string;
  situacao: string;
}

interface Historicos {

}

export default interface IProtocolo {
  id: number;
  inscricaoImobiliaria: string;
  processo: Processo;
  historicos: Historicos[]
}
