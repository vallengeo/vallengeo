import { Header } from "@/components/header";
import { TotalCadastros } from "./components/total-cadastros";
import { NovosCadastros } from "./components/novos-cadastros";
import { EmAndamento } from "./components/em-andamento";
import { ProcessosFinalizados } from "./components/processos-finalizados";
import { UltimosProcessos } from "./components/ultimos-processos";
import { HistoricoProcessos } from "./components/historico-processos";
import { Notificacoes } from "./components/notificacoes";
import { Welcome } from "./components/welcome";
import { ResumoImoveis } from "./components/resumo-imoveis";
import type { Metadata } from 'next'
import { Mapa } from './components/mapa'

export const metadata: Metadata = {
  title: 'Página Inicial - VallenGeo',
}

export default function HomePage({
  params,
}: {
  params: { municipio: string }
}) {
  return (
    <>
      <Header title="Home" canShowBrasao />

      <div className="space-y-6 my-6">
        <div className="flex gap-5 max-md:flex-col">
          <Welcome/>
          <Notificacoes/>
        </div>

        <div className="grid grid-cols-4 gap-5 max-md:grid-cols-2 max-[400px]:grid-cols-1">
          <TotalCadastros/>
          <NovosCadastros/>
          <EmAndamento/>
          <ProcessosFinalizados/>
        </div>

        <div className="grid grid-cols-2 gap-5 max-md:grid-cols-1 justify-center">
          <UltimosProcessos municipio={params.municipio} />
          <HistoricoProcessos municipio={params.municipio} />
        </div>

        <div className="bg-white border border-input rounded-3xl p-4">
          <h2 className="text-xl font-medium mb-6">Mapa da Cidade</h2>
          <Mapa/>
        </div>

        <div>
          <ResumoImoveis/>
        </div>
      </div>
    </>
  );
}