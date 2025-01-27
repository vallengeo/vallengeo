import Link from "next/link";
import { Home as LucideHome } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Header } from "@/app/[municipio]/(pagina-inicial)/components/header";
import { ArquivarProcesso } from "./components/arquivar-processo";
import { VisaoGeral } from "./components/visao-geral";
import { Historico } from "./components/historico";
import { Observacoes } from "./components/observacoes";
import IProtocolo from "@/interfaces/Analista/IProtocolo";
import { protocolo } from "@/service/analista/analistaService";
import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import IFicha from "@/interfaces/Analista/IFicha";
import { ficha } from "@/service/imovelService";

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
    const response = await protocolo(id);
    const { processo } = response.data;

    return {
      title: `Protocolo: ${processo.protocolo} | Vallengeo`,
    };
  } catch (error) {
    notFound();
  }
}

async function getData(processoId: string): Promise<IProtocolo> {
  const response = await protocolo(processoId);
  return response.data;
}

async function getFicha(processoId: string): Promise<IFicha> {
  const response = await ficha(processoId);
  return response.data;
}

export default async function VisualizarProtocolo({
  params,
  searchParams,
}: Props) {
  const data = await getData((await params).id);
  const ficha = await getFicha((await params).id);
  const municipio = (await params).municipio;

  return (
    <>
      <Header title="Protocolos">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href={`/${municipio}/dashboard`}>
                Visão Geral
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>/</BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink href={`/${municipio}/dashboard/protocolos`}>
                Protocolos
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>/</BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage>{data.processo.protocolo}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </Header>

      <div className="my-6 space-y-6">
        <div className="bg-white border border-input rounded-3xl p-6 flex items-center justify-between flex-wrap gap-4">
          <div className="flex gap-2 items-start">
            <LucideHome size={20} className="mt-1" />
            <div>
              <span className="text-lg font-medium block">
                {data.processo.protocolo}
              </span>
              <span>{ficha.representantes[0].nome}</span>
            </div>
          </div>

          <Button variant="default">
            <Link
              href={`/${municipio}/dashboard/imoveis/ficha/${data.processo.id}`}
            >
              Ficha do imóvel
            </Link>
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 space-y-6">
            <VisaoGeral protocolo={data} />
            <Historico protocolo={data} />
          </div>

          <Observacoes idProcesso={(await params).id} />
        </div>

        <div className="flex items-center justify-between gap-4 flex-col md:flex-row">
          <div className="md:mr-auto w-full md:w-fit">
            <ArquivarProcesso />
          </div>

          <Button variant={`secondary`} className="w-full md:w-fit">
            Reprovar
          </Button>

          <Button className="w-full md:w-fit">Aprovar</Button>
        </div>
      </div>
    </>
  );
}
