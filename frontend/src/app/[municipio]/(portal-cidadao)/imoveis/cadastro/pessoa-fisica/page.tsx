import { Metadata } from "next";
import { Header } from "@/components/header";
import { CurrentStepForm } from "../components/current-step-form";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb"

export const metadata: Metadata = {
  title: 'Cadastro de imóvel',
}

export default function CadastroImovelPFPage({
  params
}: {
  params: { municipio: string }
}) {
  return (
    <div className="container space-y-6 py-6">
      <div className="flex items-center justify-between flex-wrap">
        <Header
          title="Cadastro de imóvel"
          linkBack={`/${params.municipio}/imoveis/cadastro`}
        >
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href={`/${params.municipio}`}>Página Inicial</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>/</BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink href={`/${params.municipio}/imoveis`}>Imóveis</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>/</BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage className="font-normal">Cadastro de imóvel</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </Header>

        <p className="hidden md:block">*itens obrigatórios</p>
      </div>

      <main role="main" className="space-y-6 mt-6 mb-4">
        <CurrentStepForm />
      </main>
    </div>
  )
}
