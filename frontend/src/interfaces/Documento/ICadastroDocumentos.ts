interface documentos {
  idTipoDocumento: number;
  nomeTemporario: string;
  nomeOriginal: string;
  dataEnvio: Date;
}

export default interface ICadastroDocumentos {
  idProcesso: string;
  documentos: documentos[];
}
