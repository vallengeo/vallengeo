import { Metadata } from "next";
import { Header } from "@/app/[municipio]/(pagina-inicial)/components/header";
import { RelatorioForm } from "./components/relatorio-form";
import IRelatorioFiltro from "@/interfaces/Analista/IRelatorioFiltro";
import { filtrosRelatorio } from "@/service/analista/analistaService";

export const metadata: Metadata = {
  title: "Relatórios | VallenGeo",
};

async function getData(): Promise<IRelatorioFiltro> {
  const response = await filtrosRelatorio();
  return response.data;
}

export default async function RelatoriosPage() {
  const data = await getData();

  return (
    <>
      <Header title="Relatórios" />

      <div className="space-y-4 my-6">
        <RelatorioForm data={data} />
      </div>
    </>
  );
}
