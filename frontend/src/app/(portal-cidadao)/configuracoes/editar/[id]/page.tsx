import Link from "next/link"
import { Header } from "@/components/header"
import { Metadata } from "next"
import { FormEditarConfiguracoes } from "../components/form-editar-configuracoes"
import { Avatar } from "@/components/avatar"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Editar - Configurações | VallenGeo"
}

export default function ConfiguracoesEditarPage() {
  return (
    <div className="container space-y-6 py-6">
      <Header
        title="Configurações"
        linkBack="/configuracoes"
      >
        <div className="flex items-center gap-1">
          <Link href="/">Página Inicial</Link>
          <span>/</span>
          <Link href="/configuracoes">Perfil</Link>
          <span>/</span>
          <strong>Editar perfil</strong>
        </div>
      </Header>

      <main role="main" className="space-y-6 mb-4">
        <div className="bg-white border border-input rounded-2xl p-6">
          <div className="flex items-center gap-6">
            <Avatar />

            <div className="flex flex-col">
              <span className="text-[2rem]">Foto de perfil</span>

              <div className="flex items-center gap-4">
                <Button
                  variant="link"
                  className="text-link underline hover:no-underline p-0"
                >
                  remove foto
                </Button>
                <Button
                  variant="link"
                  className="text-link underline hover:no-underline p-0"
                >
                  Upload foto
                </Button>
              </div>
            </div>
          </div>
        </div>

        <FormEditarConfiguracoes />
      </main>
    </div>
  )
}