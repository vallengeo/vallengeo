import Header from "@/components/header";
import TotalCadastros from "./components/total-cadastros";
import NovosCadastros from "./components/novos-cadastros";
import EmAndamento from "./components/em-andamento";
import ProcessosFinalizados from "./components/processos-finalizados";
import UltimosProcessos from "./components/ultimos-processos";
import HistoricoProcessos from "./components/historico-processos";
import Notificacoes from "./components/notificacoes";
import Welcome from "./components/welcome";

export default function HomePage() {
  return (
    <>
      <Header title="Home"/>

      <main className="space-y-6 my-6">
        <div className="flex gap-5">
          <Welcome/>
          <Notificacoes/>
        </div>

        <div className="grid grid-cols-4 gap-5">
          <TotalCadastros/>
          <NovosCadastros/>
          <EmAndamento/>
          <ProcessosFinalizados/>
        </div>

        <div className="grid grid-cols-2 gap-5">
          <UltimosProcessos/>
          <HistoricoProcessos/>
        </div>
      </main>
    </>
  );
}