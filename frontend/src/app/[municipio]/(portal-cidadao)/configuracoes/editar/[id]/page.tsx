import Link from "next/link";
import { Header } from "@/components/header";
import { Metadata } from "next";
import { FormEditarConfiguracoes } from "./components/form-editar-configuracoes";
import { Avatar } from "@/components/avatar";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export const metadata: Metadata = {
  title: "Editar - Configurações | VallenGeo",
};

export default function ConfiguracoesEditarPage({
  params,
}: {
  params: { municipio: string };
}) {
  return (
    <div className="container space-y-6 py-6">
      <Header title="Configurações" linkBack={`/${params.municipio}`}>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href={`/${params.municipio}`}>
                Página Inicial
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>/</BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink href={`/${params.municipio}/configuracoes`}>
                Perfil
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>/</BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage>Editar perfil</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </Header>

      <div className="space-y-6 mb-4">
        {/* <div className="bg-white border border-input rounded-2xl p-6">
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
        </div> */}

        <FormEditarConfiguracoes />
      </div>
    </div>
  );
}
