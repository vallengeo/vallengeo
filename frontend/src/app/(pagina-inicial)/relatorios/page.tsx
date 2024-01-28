import Header from "../components/header";

import { Metadata } from "next";
import { ResumoRelatorios } from "../relatorios/components/resumo";

export const metadata: Metadata = {
  title: 'Relatórios - VallenGeo',
}

export default function RelatoriosPage() {
  return (
    <>
      <Header title="Relatórios"/>

      <main className="space-y-4 my-6">
        <ResumoRelatorios/>
      </main>
    </>
  )
}