interface documentos {
  idTipoDocumento: number;
  nomeTemporario: string;
  nomeOriginal: string;
  dataEnvio: Date;
}

export default interface ICadastroDocumento {
  idProcesso: string;
  documentos: documentos[];
}
