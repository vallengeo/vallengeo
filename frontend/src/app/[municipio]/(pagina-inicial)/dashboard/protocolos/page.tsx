import { Metadata } from "next";
import { Header } from "@/app/[municipio]/(pagina-inicial)/components/header";
import { ListaProtocolos } from "./components/protocolos";
import { Mapa } from "../components/mapa";

export const metadata: Metadata = {
  title: "Protocolos - VallenGeo",
};

export default function ProtocolosPage() {
  return (
    <>
      <Header title="Protocolos" />

      <div className="space-y-4 my-6">
        <div className="bg-white border border-input rounded-3xl p-4">
        <h2 className="text-xl font-medium px-6 py-4">
            Resumo de imóveis
          </h2>
          <Mapa />
        </div>

        <div className="bg-white border border-input rounded-3xl p-6">
          <ListaProtocolos />
        </div>
      </div>
    </>
  );
}