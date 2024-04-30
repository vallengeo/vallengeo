import Link from "next/link"
import { Header } from "@/components/header";
import { Metadata } from "next"
import { Button } from "@/components/ui/button";
import { ImoveisCadastrados } from "./components/imoveis-cadastrados";

export const metadata: Metadata = {
  title: "Registro de Imóveis | VallenGeo"
}

export default function RegistroImoveisPage() {
  return (
    <div className="container space-y-6 py-6 h-full grid grid-rows-[0fr_1fr]">
      <Header
        title="Imóveis"
        linkBack="/"
      >
        <div className="flex items-center gap-1">
          <Link href="/">Página Inicial</Link>
          <span>/</span>
          <strong>Imóveis</strong>
        </div>
      </Header>

      <main role="main" className="grid grid-rows-[0fr_1fr] space-y-6">
        <div className="bg-white border border-input rounded-2xl p-6 flex items-center justify-between gap-4 flex-wrap">
          <h2 className="text-xl font-medium max-w-[180px]">Cadastrar um novo imóvel</h2>
          <Button asChild>
            <Link href="/imoveis/cadastro">
              Cadastrar
            </Link>
          </Button>
        </div>

        <div className="bg-white border border-input rounded-2xl p-6 flex items-center justify-center">
          <ImoveisCadastrados />
        </div>
      </main>
    </div>
  )
}