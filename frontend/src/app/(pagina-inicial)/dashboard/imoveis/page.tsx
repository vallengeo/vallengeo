import { Metadata } from "next";

import { Header } from "@/components/header";
import { ImoveisCadastrados } from "./components/imoveis-cadastrados";

export const metadata: Metadata = {
  title: 'Imóveis - VallenGeo',
}

export default function ImoveisPage() {
  return (
    <>
      <Header
        title="Imóveis"
        canShowBrasao
      >
       <span className="font-medium">Visualização imóveis</span>
      </Header>

      <main className="space-y-6 my-6">
        <div className="bg-white border border-input rounded-3xl">
          <h2 className="text-xl font-medium px-6 py-4">Resumo de imóveis</h2>
        </div>

        <div className="bg-white border border-input rounded-2xl p-6 flex items-center justify-center">
          <ImoveisCadastrados />
        </div>
      </main>
    </>
  )
}