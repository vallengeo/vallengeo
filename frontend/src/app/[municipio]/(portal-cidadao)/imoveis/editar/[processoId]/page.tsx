import { Metadata, ResolvingMetadata } from "next";
import { notFound, redirect } from "next/navigation";
import { ficha } from "@/service/imovelService";

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

export default async function CadastroImoveisPage({
  params,
  searchParams,
}: Props) {
  const { processoId, municipio } = await params;

  return redirect(
    `/${municipio}/imoveis/editar/${processoId}/representantes`
  );
}
