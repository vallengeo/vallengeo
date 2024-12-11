import { Municipio } from "./IMunicipio";

export interface Endereco {
    id: number;
    cep: string;
    logradouro: string;
    bairro: string;
    numero: string;
    complemento: string | null;
    municipio: Municipio;
}