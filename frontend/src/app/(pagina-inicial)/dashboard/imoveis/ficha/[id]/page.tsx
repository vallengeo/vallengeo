import Link from "next/link";

import { Header } from "@/components/header";

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

export default function FichaImovelPage({
  params
}: {
  params: {
    id: string
  }
}) {
  return (
    <>
      <Header
        title="Ficha de imóvel"
        linkBack="/imoveis"
        canShowBrasao
      >
        <div className="flex items-center gap-1">
          <Link href="/dashboard/imoveis">Visualização imóveis</Link>
          <span>/</span>
          <span>01.10.347.031.001</span>
        </div>
      </Header>

      <main role="main" className="space-y-6 py-6">
        <DownloadFicha ficha={params.id} />
        <VisaoGeral ficha={params.id} />
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

          <Button variant="secondary">
            Reprovar
          </Button>

          <Button variant="default">
            Aprovar
          </Button>
        </div>
      </main>
    </>
  )
}
