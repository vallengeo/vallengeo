import Link from "next/link";

import { Metadata } from "next";
import Header from "@/app/(pagina-inicial)/components/header";
import { ActiveStepFormComponent } from "../components/activeStepForm";

export const metadata: Metadata = {
  title: "Cadastro de Imóvel",
}

export default function CadastroImoveisPF() {
  return (
    <>
      <Header
        title="Cadastro de imóvel"
        linkBack="/imoveis"
      >
        <div className="flex items-center gap-1">
          <Link href="/imoveis" className="font-medium">Imóveis</Link>
          <span>/</span>
          <strong>Novo cadastro</strong>
        </div>
      </Header>

      <main className="space-y-6 mt-6 mb-4">
        <ActiveStepFormComponent/>
      </main>
    </>
  )
}
