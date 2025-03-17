export default interface IPessoa {
  id?: string;
  email: string;
  telefone: string;
  endereco: Endereco;
  nome?: string;
  cpf?: string;
  rg?: string;
  razaoSocial?: string;
  cnpj?: string;
  responsavel?: Responsavel;
  tipoPessoa: "FISICA" | "JURIDICA";
}

interface Endereco {
  id?: number;
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

interface Responsavel {
  id: string;
  email: string;
  telefone: string;
  endereco: Endereco;
  nome?: string;
  cpf?: string;
  rg?: string;
  tipoPessoa: "FISICA" | "JURIDICA";
}
