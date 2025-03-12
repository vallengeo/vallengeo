import { Feature } from "geojson";
import { InformacaoImovel } from "./IInformacaoImovel";

export interface MapaImovel {
    id: number;
    inscricaoImobiliaria: string;
    idProcesso: string;
    informacaoImovel: InformacaoImovel;
    geometria: Feature;
}