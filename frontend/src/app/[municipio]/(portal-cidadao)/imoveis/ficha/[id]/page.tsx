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

async function getData(processoId: string): Promise<IFicha> {
  const response = await ficha(processoId);
  return response.data;
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

  return (
    <div className="container space-y-6 py-6">
      <div className="flex items-start md:items-center justify-between flex-col md:flex-row flex-wrap gap-6">
        <Header
          title="Ficha de imóvel"
          linkBack={`/${params.municipio}/imoveis`}
        >
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href={`/${params.municipio}/imoveis`}>
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
          href={`/${params.municipio}/imoveis/cadastro/pessoa-fisica/editar/${params.id}`}
          className="flex items-center gap-0.5"
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
      <Observacoes />
      <DocumentosEnviados ficha={data} />
      <Historico />

      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
    </div>
  );
}
