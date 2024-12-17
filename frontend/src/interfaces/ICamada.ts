import CamadaCategoria from "./ICamadaCategoria";

export default interface Camada {
  id: number;
  nome: string;
  codigo: string;
  ordem: number;
  corPreenchimento: string;
  corBorda: string;
  categoria: CamadaCategoria;
}
