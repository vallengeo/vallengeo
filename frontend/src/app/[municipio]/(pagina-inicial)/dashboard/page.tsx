import { Header } from "@/app/[municipio]/(pagina-inicial)/components/header";
import { UltimosProcessos } from "./components/ultimos-processos";
import { HistoricoProcessos } from "./components/historico-processos";
import { Notificacoes } from "./components/notificacoes";
import { Welcome } from "./components/welcome";
import { ResumoImoveis } from "./components/resumo-imoveis";
import type { Metadata } from "next";
import { Suspense } from "react";
import { Mapa } from "./components/mapa";
import { Totalizadores } from "./components/totalizadores";
import { MapaSkeleton } from "./components/mapa/skeleton";
import IImovelCadastrados from "@/interfaces/IImovelCadastrados";
import {
  imoveisCadastrados,
  notificacaoNaoVisualizada,
  totalizadoresProcesso,
  ultimosAdicionados,
  ultimosAlterados,
} from "@/service/analista/analistaService";
import INotificacaoNaoVisualizada from "@/interfaces/Analista/INotificacaoNaoVisualizada";
import ITotalizadores from "@/interfaces/Analista/ITotalizadores";
import IUltimosAdicionados from "@/interfaces/Analista/IUltimosAdicionados";
import IUltimosAlterados from "@/interfaces/Analista/IUltimosAlterados";

export const metadata: Metadata = {
  title: "Página Inicial | VallenGeo",
};

async function getData(): Promise<IImovelCadastrados> {
  const response = await imoveisCadastrados();
  return response;
}

async function getNotificaoes(): Promise<INotificacaoNaoVisualizada[]> {
  const response = await notificacaoNaoVisualizada();
  return response.data;
}

async function getTotalizadores(): Promise<ITotalizadores> {
  const response = await totalizadoresProcesso();
  return response.data;
}

async function getUltimosAdicionados(): Promise<IUltimosAdicionados[]> {
  const response = await ultimosAdicionados();
  return response.data;
}

async function getUltimosAlterados(): Promise<IUltimosAlterados[]> {
  const response = await ultimosAlterados();
  return response.data;
}

export default async function HomePage({
  params,
}: {
  params: { municipio: string };
}) {
  const data = await getData();
  const notificacoes = await getNotificaoes();
  const totalizadores = await getTotalizadores();
  const ultimosAdicionados = await getUltimosAdicionados();
  const ultimosAlterados = await getUltimosAlterados();

  return (
    <>
      <Header title="Home" />

      <div className="space-y-6 my-6">
        <div className="flex gap-6 max-md:flex-col">
          <Welcome />

          <Notificacoes
            municipio={params.municipio}
            notificacoes={notificacoes}
          />
        </div>

        <Totalizadores totalizadores={totalizadores} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-center">
          <UltimosProcessos
            municipio={params.municipio}
            ultimosAdicionados={ultimosAdicionados}
          />
          <HistoricoProcessos
            municipio={params.municipio}
            ultimosAlterados={ultimosAlterados}
          />
        </div>

        <Suspense fallback={<MapaSkeleton />}>
          <div className="bg-white border border-input rounded-3xl overflow-hidden relative z-10">
            <h2 className="text-xl font-medium px-6 py-5">Mapa da Cidade</h2>
            <Mapa />
          </div>
        </Suspense>

        <ResumoImoveis data={data.conteudo} />
      </div>
    </>
  );
}
