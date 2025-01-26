import { Header } from "@/app/[municipio]/(pagina-inicial)/components/header";
import { DownloadFicha } from "./components/download-ficha";
import { VisaoGeral } from "./components/visao-geral";
import { InformacoesImovel } from "./components/informacoes-imovel";
import { InformacoesContato } from "./components/informacoes-contato";
import { CaracterizacaoImovel } from "./components/caracterizacao-imovel";
import { Georeferenciamento } from "./components/georeferenciamento";
import { Observacoes } from "./components/observacoes";
import { DocumentosEnviados } from "./components/documentos-enviados";
import { Historico } from "./components/historico";
import { RepresentantesImovel } from "./components/representantes";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import IFicha from "@/interfaces/Analista/IFicha";
import { notFound } from "next/navigation";
import { HistoricoObservacoes } from "./components/historico-observacoes";
import { Button } from "@/components/ui/button";
import { ficha } from "@/service/analista/analistaService";
import type { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: Promise<{ id: string; municipio: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  try {
    const resolvedParams = await params;
    const id = resolvedParams.id;
    const response = await ficha(id);
    const { inscricaoImobiliaria } = response.data;

    return {
      title: `Ficha de imóvel: ${inscricaoImobiliaria} | Vallengeo`,
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

export default async function FichaImovelPage({ params, searchParams }: Props) {
  const data = await getData((await params).id);
  const municipio = (await params).municipio;

  if (!data || !data.id) {
    notFound();
    return null;
  }

  return (
    <div className="space-y-6 pb-6">
      <Header title="Ficha de imóvel">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href={`/${municipio}/dashboard/imoveis`}>
                Visualização imóveis
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>/</BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage className="font-normal">
                {data.inscricaoImobiliaria}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </Header>

      <DownloadFicha ficha={data} />
      <VisaoGeral municipio={municipio} ficha={data} />
      <InformacoesImovel ficha={data} />
      <RepresentantesImovel ficha={data} />
      <InformacoesContato ficha={data} />
      <CaracterizacaoImovel ficha={data} />
      <Georeferenciamento />
      <Observacoes />
      <DocumentosEnviados ficha={data} />

      <div className="flex flex-col md:flex-row gap-6">
        <Historico />
        <HistoricoObservacoes />
      </div>

      <div className="flex items-center gap-6 flex-col md:flex-row">
        <Button variant="secondary" className="md:mr-auto w-full md:w-fit" disabled>
          Arquivar ficha
        </Button>
        <Button variant="secondary" disabled className="w-full md:w-fit">
          Reprovar
        </Button>
        <Button variant="default" disabled className="w-full md:w-fit">
          Aprovar
        </Button>
      </div>
    </div>
  );
}
