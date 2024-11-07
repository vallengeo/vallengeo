import { Estado } from "./IEstado";

export interface Municipio {
    id: number;
    nome: string;
    estado: Estado;
}