interface documentos {
  idTipoDocumento: number;
  nomeTemporario: string;
  nomeOriginal: string;
  dataEnvio: Date;
}

export default interface IArquivarImovel {
  titulo: string;
  descricao: string;
  idProcesso: string;
  documentos: documentos[];
}
