import Link from "next/link";
import { Header } from "@/components/header";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { Building, User } from "lucide-react";

export const metadata: Metadata = {
  title: "Cadastro de Imóvel | VallenGeo",
};

export default function CadastroImoveisPage({
  params,
}: {
  params: { municipio: string };
}) {
  return (
    <div className="container space-y-6 py-6">
      <Header
        title="Cadastro de imóvel"
        linkBack={`/${params.municipio}/imoveis`}
      >
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href={`/${params.municipio}`}>
                Página Inicial
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>/</BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink href={`/${params.municipio}/imoveis`}>
                Imóveis
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>/</BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage>Cadastro de Imóveis</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </Header>

      <main role="main">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-start gap-6 border border-input rounded-2xl py-9 px-7 bg-white">
            <Building size={40} />

            <div className="flex-1 flex flex-col gap-8">
              <h3 className="text-xl md:text-2xl font-medium">
                Cadastrar imóvel de Pessoa Jurídica
              </h3>

              <Button asChild variant="default" className="w-10/12 ml-4">
                <Link
                  href={`/${params.municipio}/imoveis/cadastro/pessoa-juridica/representantes`}
                >
                  Acessar
                </Link>
              </Button>
            </div>
          </div>

          <div className="flex items-start gap-6 border border-input rounded-2xl py-9 px-7 bg-white">
            <User size={40} />

            <div className="flex-1 flex flex-col gap-8">
              <h3 className="text-xl md:text-2xl font-medium">
                Cadastrar imóvel de Pessoa Física
              </h3>

              <Button variant="default" asChild className="w-10/12 ml-4">
                <Link
                  href={`/${params.municipio}/imoveis/cadastro/pessoa-fisica/representantes`}
                >
                  Acessar
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
