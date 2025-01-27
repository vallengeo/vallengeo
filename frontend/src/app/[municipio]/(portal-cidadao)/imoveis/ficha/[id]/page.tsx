import Link from "next/link";
import { Header } from "@/components/header";
import { PenSquare } from "lucide-react";
import { DownloadFicha } from "./components/download-ficha";
import { VisaoGeral } from "./components/visao-geral";
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
import { ficha } from "@/service/imovelService";
import IFicha from "@/interfaces/Analista/IFicha";
import { InformacoesImovel } from "./components/informacoes-imovel";
import { notFound } from "next/navigation";
import type { Metadata, ResolvingMetadata } from "next";
import IProtocolo from "@/interfaces/Analista/IProtocolo";
import { protocolo } from "@/service/analista/analistaService";

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

async function getProcolo(processoId: string): Promise<IProtocolo> {
  const response = await protocolo(processoId);
  return response.data;
}

export default async function FichaImovelPage({ params, searchParams }: Props) {
  const data = await getData((await params).id);
  const protocolo = await getProcolo((await params).id);
  const municipio = (await params).municipio;

  console.log(data);
  if (!data || !data.id) {
    notFound();
    return null;
  }

  return (
    <div className="container space-y-6 py-6">
      <div className="flex items-start md:items-center justify-between flex-col md:flex-row flex-wrap gap-6">
        <Header
          title="Ficha de imóvel"
          linkBack={`/${municipio}/imoveis`}
        >
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href={`/${municipio}/imoveis`}>
                  Imóveis
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>/</BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage className="font-normal">
                  Ficha de imóvel
                </BreadcrumbPage>
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

        <Link
          href={`/${municipio}/imoveis/cadastro/pessoa-fisica/editar/${data.processo.id}`}
          className="flex items-center gap-0.5 opacity-50 pointer-events-none"
        >
          <PenSquare size={20} />
          Editar
        </Link>
      </div>

      <DownloadFicha ficha={data} />
      <VisaoGeral ficha={data} />
      <InformacoesImovel ficha={data} />
      <RepresentantesImovel ficha={data} />
      <InformacoesContato ficha={data} />
      <CaracterizacaoImovel ficha={data} />
      <Georeferenciamento />
      {/* <Observacoes /> */}
      <DocumentosEnviados ficha={data} />
      <Historico protocolo={protocolo} />
    </div>
  );
}
