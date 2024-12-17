import { Feature } from "geojson";
import { InformacaoImovel } from "./IInformacaoImovel";

export interface MapaImovel {
    id: number;
    inscricaoImobiliaria: string;
    informacaoImovel: InformacaoImovel;
    geometria: Feature;
}