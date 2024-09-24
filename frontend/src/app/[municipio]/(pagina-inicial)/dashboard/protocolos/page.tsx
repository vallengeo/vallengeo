import { Metadata } from "next";
import { Header } from "@/components/header";
import { ListaProtocolos } from "./components/protocolos";

export const metadata: Metadata = {
  title: 'Protocolos - VallenGeo',
}

export default function ProtocolosPage() {
  return (
    <>
      <Header
        title="Protocolos"
        canShowBrasao
      />

      <div className="space-y-4 my-6">
        <div className="bg-white border border-input rounded-3xl p-6">
          <h2 className="text-xl font-medium">Resumo de imovéis</h2>
        </div>

        <div className="bg-white border border-input rounded-3xl p-6">
          <ListaProtocolos />
        </div>
      </div>
    </>
  )
}