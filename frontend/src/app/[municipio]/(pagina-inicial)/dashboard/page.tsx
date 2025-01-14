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

export const metadata: Metadata = {
  title: "Página Inicial - VallenGeo",
};

export default function HomePage({
  params,
}: {
  params: { municipio: string };
}) {
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

        <div className="bg-white border border-input rounded-3xl p-4">
          <h2 className="text-xl font-medium mb-6">Mapa da Cidade</h2>
          <Mapa />
        </div>

        <div>
          <ResumoImoveis />
        </div>
      </div>
    </>
  );
}
