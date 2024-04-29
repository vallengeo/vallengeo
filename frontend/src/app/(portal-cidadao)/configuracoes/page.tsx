import Link from "next/link"
import { Header } from "@/components/header"
import { Metadata } from "next"
import { Representantes } from "./components/representantes"

export const metadata: Metadata = {
  title: "Configurações | VallenGeo"
}

export default function CidadaoConfiguracoesPage() {
  return (
    <div className="container space-y-6 py-6">
      <Header
        title="Configurações"
        linkBack="/"
      >
        <div className="flex items-center gap-1">
          <Link href="/">Página Inicial</Link>
          <span>/</span>
          <strong>Perfil</strong>
        </div>
      </Header>

      <main role="main" className="space-y-6">
        <Representantes />

        <div className="bg-white border border-input rounded-2xl p-6">
          <h2 className="text-xl mb-7">Informações de contato</h2>

          <div className="grid grid-cols-5 gap-4">
            <div className="flex flex-col">
              <span className="font-medium text-sm">Nome Completo</span>
              <span>Davi Luan Manuel da Cruz</span>
            </div>

            <div className="flex flex-col">
              <span className="font-medium text-sm">Telefone</span>
              <span>(24) 2758-1193</span>
            </div>

            <div className="flex flex-col">
              <span className="font-medium text-sm">E-mail</span>
              <span>daviluandacruz@zf-lensysteme.com</span>
            </div>

            <div className="flex flex-col">
              <span className="font-medium text-sm">CNPJ</span>
              <span>119.220.336-22</span>
            </div>

            <div className="flex flex-col">
              <span className="font-medium text-sm">CPF</span>
              <span>119.220.336-22</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}