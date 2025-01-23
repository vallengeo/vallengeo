import { Metadata } from "next";
import { Header } from "@/app/[municipio]/(pagina-inicial)/components/header";
import { ListaProtocolos } from "./components/protocolos";
import { Mapa } from "../components/mapa";
import { imoveisCadastrados } from "@/service/analista/analistaService";
import IImovelCadastrados from "@/interfaces/IImovelCadastrados";

export const metadata: Metadata = {
  title: "Protocolos | VallenGeo",
};

async function getData(): Promise<IImovelCadastrados> {
  const response = await imoveisCadastrados();
  return response;
}

export default async function ProtocolosPage() {
  const data = await getData();

  return (
    <>
      <Header title="Protocolos" />

      <div className="space-y-6 my-6">
        <div className="bg-white border border-input rounded-3xl overflow-hidden">
          <h2 className="text-xl font-medium px-6 py-5">Resumo de imóveis</h2>
          <Mapa />
        </div>

        <div className="bg-white border border-input rounded-3xl p-6">
          <ListaProtocolos data={data.conteudo} />
        </div>
      </div>
    </>
  );
}
