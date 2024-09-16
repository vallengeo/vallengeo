import Link from "next/link"
import { Header } from "@/components/header";
import { Metadata } from "next"
import { Button } from "@/components/ui/button";

import {
  Building,
  User
} from "lucide-react";

export const metadata: Metadata = {
  title: "Cadastro de Imóvel | VallenGeo"
}

export default function CadastroImoveisPage() {
  return (
    <div className="container space-y-6 py-6">
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

      <main role="main">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-start gap-6 border border-input rounded-2xl py-9 px-7 bg-white">
            <Building size={40} />

            <div className="flex-1 flex flex-col gap-8">
              <h3 className="text-xl md:text-2xl font-medium">Cadastrar imóvel de Pessoa jurídica</h3>

              <Button asChild variant="default" className="w-10/12 ml-4">
                <Link href="/imoveis/cadastro/pessoa-juridica">
                  Acessar
                </Link>
              </Button>
            </div>
          </div>

          <div className="flex items-start gap-6 border border-input rounded-2xl py-9 px-7 bg-white">
            <User size={40} />

            <div className="flex-1 flex flex-col gap-8">
              <h3 className="text-xl md:text-2xl font-medium">Cadastrar imóvel de Pessoa Física</h3>

              <Button variant="default" asChild className="w-10/12 ml-4">
                <Link href="/imoveis/cadastro/pessoa-fisica">
                  Acessar
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}