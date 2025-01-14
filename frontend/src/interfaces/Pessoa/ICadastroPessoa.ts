interface Endereco {
  cep: string;
  logradouro: string;
  bairro: string;
  numero: string;
  complemento: string;
  idMunicipio: number;
}

export default interface ICadastroPessoa {
  id: string;
  email: string;
  telefone: string;
  tipoPessoa: "FISICA" | "JURIDICA";
  endereco: Endereco;
}
