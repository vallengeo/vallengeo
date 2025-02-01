import { Metadata } from "next";
import { Steps } from "../../_components/steps";
import { FormCadastroRepresentantes } from "./_components/form";
import IEstados from "@/interfaces/Localidade/IEstado";
import { listarEstados } from "@/service/localidadeService";

export const metadata: Metadata = {
  title: "Representantes | VallenGeo",
};

async function getEstados(): Promise<IEstados[]> {
  const response = await listarEstados();
  return response.data;
}

export default async function CadastroRepresentantesPage() {
  const estados = await getEstados();

  return (
    <>
      <Steps currentStep={1} />
      <FormCadastroRepresentantes estados={estados} />
    </>
  );
}
