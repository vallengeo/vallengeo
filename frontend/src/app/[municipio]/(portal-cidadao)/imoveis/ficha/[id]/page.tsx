import Link from "next/link";

import { Header } from "@/components/header";
import { Download, PenSquare } from "lucide-react";

import { DownloadFicha } from "./components/download-ficha";
import { VisaoGeral } from "./components/visao-geral";
import { InformacoesContato } from "./components/informacoes-contato";
import { CaracterizacaoImovel } from "./components/caracterizacao-imovel";
import { Georeferenciamento } from "./components/georeferenciamento";
import { Observacoes } from "./components/observacoes";
import { DocumentosEnviados } from "./components/documentos-enviados";
import { Historico } from "./components/historico";
import { RepresentantesImovel } from "./components/representantes";

export default function FichaImovelPage({
  params
}: {
  params: {
    municipio: string,
    id: string
  }
}) {
  return (
    <main
      role="main"
      className="container space-y-6 py-6"
    >
      <div className="flex items-center justify-between flex-wrap">
        <Header
          title="Ficha de imóvel"
          linkBack={`/${params.municipio}/imoveis`}
        >
          <div className="flex items-center gap-1">
            <Link href={`/${params.municipio}/imoveis`}>Imóveis</Link>
            <span>/</span>
            <span>Ficha de imóvel</span>
            <span>/</span>
            <strong>{params.id}</strong>
          </div>
        </Header>

        <Link
          href={`/imoveis/editar/${params.id}`}
          className="flex items-center gap-0.5"
        >
          <PenSquare size={20} />
          Editar
        </Link>
      </div>

      <DownloadFicha ficha={params.id} />
      <VisaoGeral ficha={params.id} />
      <RepresentantesImovel />
      <InformacoesContato />
      <CaracterizacaoImovel />
      <Georeferenciamento />
      <Observacoes />
      <DocumentosEnviados />
      <Historico />
    </main>
  )
}
