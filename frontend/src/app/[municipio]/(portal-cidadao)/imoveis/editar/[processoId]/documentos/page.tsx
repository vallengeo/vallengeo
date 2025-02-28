import { Metadata, ResolvingMetadata } from "next";
import { Steps } from "@/components/steps";
import { FormCadastroDocumentos } from "./_components/form";
import ITipoDocumento from "@/interfaces/ITipoDocumento";
import { tipoDocumento } from "@/service/documentoService";
import IFicha from "@/interfaces/Analista/IFicha";
import { ficha } from "@/service/imovelService";
import { notFound } from "next/navigation";

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

async function getDocumentos(): Promise<ITipoDocumento[]> {
  const response = await tipoDocumento();
  return response.data;
}

export default async function CadastroDocumentosPage({
  params,
  searchParams,
}: Props) {
  const data = await getData((await params).processoId);
  const documentos = await getDocumentos();

  if (!data || !data.id) {
    notFound();
    return null;
  }

  return (
    <>
      <Steps currentStep={3} />
      <FormCadastroDocumentos ficha={data} documentos={documentos} />
    </>
  );
}
