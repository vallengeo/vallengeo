import { Header } from "@/app/[municipio]/(pagina-inicial)/components/header";
import { DownloadFicha } from "./components/download-ficha";
import { VisaoGeral } from "./components/visao-geral";
import { InformacoesContato } from "./components/informacoes-contato";
import { CaracterizacaoImovel } from "./components/caracterizacao-imovel";
import { Georeferenciamento } from "./components/georeferenciamento";
import { Observacoes } from "./components/observacoes";
import { DocumentosEnviados } from "./components/documentos-enviados";
import { Historico } from "./components/historico";
import { RepresentantesImovel } from "./components/representantes";
import { Button } from "@/components/ui/button";
import { HistoricoObservacoes } from "./components/historico-observacoes";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import IFicha from "@/interfaces/Analista/IFicha";
import { ficha } from "@/service/analista/analistaService";
import { redirect } from "next/navigation";
import { Building } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { DownloadFichaSkeleton } from "./components/download-ficha-skeleton";

async function getData(processoId: string): Promise<IFicha> {
  const response = await ficha(processoId);
  return response;
}

export default async function FichaImovelPage({
  params,
}: {
  params: {
    municipio: string;
    id: string;
  };
}) {
  const data = await getData(params.id);

  if (!data.id) {
    redirect(`/${params.municipio}/dashboard/imoveis`);
  }

  return (
    <>
      <Header
        title="Ficha de imóvel"
        linkBack={`/${params.municipio}/dashboard/imoveis`}
      >
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href={`/${params.municipio}/dashboard/imoveis`}>
                Visualização imóveis
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>/</BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage>{params.id}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </Header>

      <div className="space-y-6 py-6">
        <div className="flex items-center justify-between flex-wrap gap-y-6 bg-white border border-input rounded-3xl px-8 py-4">
          <div className="flex items-center gap-5">
            <Building size={32} />

            <div className="flex flex-col gap-1">
              <span className="text-2xl font-medium">{data.inscricaoImobiliaria}</span>
              <span>{data.representantes[0].contato.nome}</span>
            </div>
          </div>

          <Suspense fallback={<DownloadFichaSkeleton />}>
            <DownloadFicha idDocumento={data.processo.id} />
          </Suspense>
        </div>

        <div className="bg-white border border-input rounded-3xl px-8 py-6">
          <header className="flex items-center justify-between">
            <h2 className="text-xl font-medium">Visão Geral</h2>
          </header>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-5 text-sm">
            <div className="flex flex-col gap-1">
              <span className="font-medium">Número de protocolo</span>
              <span className="text-[#0056F9] underline">{data.processo.id}</span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="font-medium">Inscrição imobiliária</span>
              <span>{data.inscricaoImobiliaria}</span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="font-medium">Última atualização</span>
              <time dateTime="02-02-2022"></time>
            </div>

            <div className="flex flex-col gap-1">
              <span className="font-medium">Situação</span>
              <span className="inline-flex text-sm whitespace-nowrap font-light bg-[#FACF61] px-2 rounded-3xl w-fit">

              </span>
            </div>
          </div>
        </div>

        <RepresentantesImovel />
        <InformacoesContato />
        <CaracterizacaoImovel />
        <Georeferenciamento />
        <Observacoes />
        <DocumentosEnviados />

        <div className="flex flex-col md:flex-row gap-6">
          <Historico />
          <HistoricoObservacoes />
        </div>

        <div className="flex items-center gap-6">
          <Button variant="secondary" className="mr-auto">
            Arquivar ficha
          </Button>
          <Button variant="secondary">Reprovar</Button>
          <Button variant="default">Aprovar</Button>
        </div>
      </div>
    </>
  );
}
