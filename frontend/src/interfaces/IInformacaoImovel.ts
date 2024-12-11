import { Endereco } from "./IEndereco";
import { TipoUso } from "./ITipoUso";

export interface InformacaoImovel {
    id: number;
    tipoUso: TipoUso;
    endereco: Endereco;
}