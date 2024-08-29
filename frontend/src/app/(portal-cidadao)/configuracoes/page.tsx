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
      </main>
    </div>
  )
}