import { Metadata } from "next";
import { Header } from "@/components/header";
import { ResumoRelatorios } from "./components/resumo";

export const metadata: Metadata = {
  title: 'Relatórios - VallenGeo',
}

export default function RelatoriosPage() {
  return (
    <>
      <Header title="Relatórios" canShowBrasao />

      <div className="space-y-4 my-6">
        <ResumoRelatorios/>
      </div>
    </>
  )
}