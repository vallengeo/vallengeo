import { Metadata } from "next";
import { Steps } from "../../_components/steps";
import { FormCadastroImovel } from "./_components/form";
import IEstados from "@/interfaces/Localidade/IEstado";
import { listarEstados } from "@/service/localidadeService";
import { TipoUso as ITipoUso } from "@/interfaces/ITipoUso";
import { tipoUso } from "@/service/imovelService";

export const metadata: Metadata = {
  title: "Imóvel | VallenGeo",
};

async function getEstados(): Promise<IEstados[]> {
  const response = await listarEstados();
  return response.data;
}

async function getTipoUso(): Promise<ITipoUso[]> {
  const response = await tipoUso();
  return response.data;
}

export default async function CadastroImovelPage() {
  const estados = await getEstados();
  const grupos = await getTipoUso();

  return (
    <>
      <Steps currentStep={2} />
      <FormCadastroImovel estados={estados} grupos={grupos} />
    </>
  );
}
