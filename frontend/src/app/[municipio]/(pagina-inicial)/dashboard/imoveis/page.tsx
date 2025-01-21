import { Metadata } from "next";
import { Header } from "@/app/[municipio]/(pagina-inicial)/components/header";
import { ImoveisCadastrados } from "./components/imoveis-cadastrados";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Mapa } from "../components/mapa";
import IImovelCadastrados from "@/interfaces/IImovelCadastrados";
import { imoveisCadastrados } from "@/service/analista/analistaService";

export const metadata: Metadata = {
  title: "Imóveis | VallenGeo",
};

async function getData(): Promise<IImovelCadastrados> {
  const response = await imoveisCadastrados();
  return response;
}

export default async function ImoveisPage() {
  const data = await getData();

  return (
    <>
      <Header title="Imóveis">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage className="font-normal">
                Visualização imóveis
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </Header>

      <div className="space-y-6 my-6">
        <div className="bg-white border border-input rounded-3xl">
          <h2 className="text-xl font-medium px-6 py-5">
            Resumo de imóveis
          </h2>
          <Mapa />
        </div>

        <div className="bg-white border border-input rounded-2xl p-6 flex items-center justify-center">
          <ImoveisCadastrados data={data.conteudo} />
        </div>
      </div>
    </>
  );
}