import { Header } from "@/app/[municipio]/(pagina-inicial)/components/header";
import { UltimosProcessos } from "./components/ultimos-processos";
import { HistoricoProcessos } from "./components/historico-processos";
import { Notificacoes } from "./components/notificacoes";
import { Welcome } from "./components/welcome";
import { ResumoImoveis } from "./components/resumo-imoveis";
import type { Metadata } from "next";
import { Suspense } from "react";
import { Mapa } from "./components/mapa";
import { UltimosProcessosSkeleton } from "./components/ultimos-processos-skeleton";
import { HistoricoProcessosSkeleton } from "./components/historico-processos-skeleton";
import { Totalizadores } from "./components/totalizadores";
import { TotalizadoresSkeleton } from "./components/totalizadores-skeleton";
import { NotificacoesSkeleton } from "./components/notificacoes-skeleton";
import { MapaSkeleton } from "./components/mapa/skeleton";
import { ResumoImoveisSkeleton } from "./components/resumo-imoveis/skeleton";
import IImovelCadastrados from "@/interfaces/IImovelCadastrados";
import { imoveisCadastrados } from "@/service/analista/analistaService";

export const metadata: Metadata = {
  title: "Página Inicial | VallenGeo",
};

async function getData(): Promise<IImovelCadastrados> {
  const response = await imoveisCadastrados();
  return response;
}

export default async function HomePage() {
  const data = await getData();

  return (
    <>
      <Header title="Home" />

      <div className="space-y-6 my-6">
        <div className="flex gap-5 max-md:flex-col">
          <Welcome />

          <Suspense fallback={<NotificacoesSkeleton />}>
            <Notificacoes />
          </Suspense>
        </div>

        <Suspense fallback={<TotalizadoresSkeleton />}>
          <Totalizadores />
        </Suspense>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 justify-center">
          <Suspense fallback={<UltimosProcessosSkeleton />}>
            <UltimosProcessos />
          </Suspense>
          <Suspense fallback={<HistoricoProcessosSkeleton />}>
            <HistoricoProcessos />
          </Suspense>
        </div>

        <Suspense fallback={<MapaSkeleton />}>
          <div className="bg-white border border-input rounded-3xl overflow-hidden relative z-10">
            <h2 className="text-xl font-medium px-6 py-5">Mapa da Cidade</h2>
            <Mapa />
          </div>
        </Suspense>

        <Suspense fallback={<ResumoImoveisSkeleton />}>
          <ResumoImoveis data={data.conteudo} />
        </Suspense>
      </div>
    </>
  );
}
