import { Feature } from "geojson";

export default interface IIntersectGeo {
  geometria: Feature;
  informacoesImovel: InformacoesImovel;
}

interface InformacoesImovel {
  informacaoImovel: InformacaoImovel;
  caracterizacaoImovel: CaracterizacaoImovel;
}

interface InformacaoImovel {
  endereco: Endereco;
}

interface Endereco {
  cep: string;
  logradouro: string;
  bairro: string;
  numero: number;
  complemento: string | null;
  idMunicipio: number;
  nomeMunicipio: string;
  siglaUf: string;
}

interface CaracterizacaoImovel {
  setor: string;
  quadra: string;
  lote: string;
  unidade: string;
  areaTerreno: number | string;
  testadaPrincipal: number | string;
  fracaoIdeal: number | string;
  dataInclusao: string | null;
}
