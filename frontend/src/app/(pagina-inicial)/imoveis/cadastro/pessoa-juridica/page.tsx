'use client'

import { Metadata } from "next";
import Link from "next/link";

import { Header } from "@/app/(pagina-inicial)/components/header";
import { ActiveStepFormComponent } from "../components/activeStepForm";

export const metada: Metadata = {
  title: 'Cadastro de imóvel',
}

export default function CadastroImoveisPJ() {
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
        <ActiveStepFormComponent isPJ />
      </main>
    </>
  )
}
