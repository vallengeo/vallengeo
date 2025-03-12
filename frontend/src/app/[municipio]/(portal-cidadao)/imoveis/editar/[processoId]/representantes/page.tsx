import { Metadata, ResolvingMetadata } from "next";
import { Steps } from "@/components/steps";
import { FormCadastroRepresentantes } from "./_components/form";
import IEstados from "@/interfaces/Localidade/IEstado";
import { listarEstados } from "@/service/localidadeService";
import { ficha } from "@/service/imovelService";
import { notFound } from "next/navigation";
import IFicha from "@/interfaces/Analista/IFicha";

type Props = {
  params: Promise<{ processoId: string; municipio: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  try {
    const resolvedParams = await params;
    const processoId = resolvedParams.processoId;
    const response = await ficha(processoId);
    const { inscricaoImobiliaria } = response.data;

    return {
      title: `Editar imóvel: ${inscricaoImobiliaria} | Vallengeo`,
    };
  } catch (error) {
    notFound();
  }
}

async function getData(processoId: string): Promise<IFicha | null> {
  try {
    const response = await ficha(processoId);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar os dados:", error);
    return null;
  }
}

async function getEstados(): Promise<IEstados[]> {
  const response = await listarEstados();
  return response.data;
}

export default async function CadastroRepresentantesPage({
  params,
  searchParams,
}: Props) {
  const data = await getData((await params).processoId);
  const estados = await getEstados();

  if (!data || !data.id) {
    notFound();
    return null;
  }

  return (
    <>
      <Steps currentStep={1} />
      <FormCadastroRepresentantes ficha={data} estados={estados} />
    </>
  );
}
