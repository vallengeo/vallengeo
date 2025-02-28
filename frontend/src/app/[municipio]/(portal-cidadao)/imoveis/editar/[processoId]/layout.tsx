"use client";

import { FormCadastroPFProvider } from "@/contexts/formCadastroPFContext";
import { Header } from "@/components/header";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbSeparator,
  BreadcrumbLink,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

export default function CadastroImovelPFLayout({
  params,
  children,
}: {
  params: { municipio: string, processoId: string };
  children: React.ReactNode;
}) {
  const { municipio, processoId } = params;

  return (
    <div className="container space-y-6 py-6">
      <div className="flex items-center justify-between flex-wrap">
        <Header
          title="Editar imóvel"
          linkBack={`/${municipio}/imoveis/ficha/${processoId}`}
        >
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href={`/${municipio}`}>
                  Página Inicial
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>/</BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink href={`/${municipio}/imoveis`}>
                  Imóveis
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>/</BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink href={`/${municipio}/imoveis/ficha/${processoId}`}>
                  Ficha
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>/</BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage>
                  Editar imóvel
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </Header>

        <p className="hidden md:block">*itens obrigatórios</p>
      </div>

      <div className="space-y-6 mt-6 mb-4">
        <FormCadastroPFProvider>{children}</FormCadastroPFProvider>
      </div>
    </div>
  );
}
