import { Metadata } from "next";
import { Header } from "@/components/header";
import { ImoveisCadastrados } from "./components/imoveis-cadastrados";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb"

export const metadata: Metadata = {
  title: 'Imóveis - VallenGeo',
}

export default function ImoveisPage() {
  return (
    <>
      <Header
        title="Imóveis"
        canShowBrasao
      >
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage className="font-normal">Visualização imóveis</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </Header>

      <div className="space-y-6 my-6">
        <div className="bg-white border border-input rounded-3xl">
          <h2 className="text-xl font-medium px-6 py-4">Resumo de imóveis</h2>
        </div>

        <div className="bg-white border border-input rounded-2xl p-6 flex items-center justify-center">
          <ImoveisCadastrados />
        </div>
      </div>
    </>
  )
}