"use client";

import { FormCadastroPJProvider } from "@/contexts/formCadastroPJContext";
import { Header } from "@/components/header";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbSeparator,
  BreadcrumbLink,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

export default function CadastroImovelPJLayout({
  params,
  children,
}: {
  params: { municipio: string };
  children: React.ReactNode;
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
                <BreadcrumbPage className="font-normal">
                  Cadastro de imóvel
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </Header>

        <p className="hidden md:block">*itens obrigatórios</p>
      </div>

      <div className="space-y-6 mt-6 mb-4">
        <FormCadastroPJProvider>{children}</FormCadastroPJProvider>
      </div>
    </div>
  );
}
