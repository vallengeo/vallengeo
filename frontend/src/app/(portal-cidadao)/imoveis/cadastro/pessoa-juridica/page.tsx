'use client'

import { Metadata } from "next";
import Link from "next/link";

import { Header } from "@/components/header";
import { CurrentStepForm } from "../components/current-step-form";

export const metada: Metadata = {
  title: 'Cadastro de imóvel',
}

export default function CadastroImovelPJPage() {
  return (
    <div className="container space-y-6 py-6">
      <div className="flex items-center justify-between">
        <Header
          title="Cadastro de imóvel"
          linkBack="/imoveis"
        >
          <div className="flex items-center gap-1">
            <Link href="/">Página Inicial</Link>
            <span>/</span>
            <Link href="/imoveis">Imóveis</Link>
            <span>/</span>
            <strong>Cadastro de imóvel</strong>
          </div>
        </Header>

        <p>*itens obrigatórios</p>
      </div>

      <main role="main" className="space-y-6 mt-6 mb-4">
        <CurrentStepForm isPJ />
      </main>
    </div>
  )
}
