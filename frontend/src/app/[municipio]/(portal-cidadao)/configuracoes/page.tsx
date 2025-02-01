import { Header } from "@/components/header";
import { Metadata } from "next";
import { PerfilUsuario } from "./components/perfil-usuario";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Contato } from "./components/contato";

export const metadata: Metadata = {
  title: "Configurações | VallenGeo",
};

export default function CidadaoConfiguracoesPage({
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
              <BreadcrumbPage>Perfil</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </Header>

      <div className="space-y-6">
        <PerfilUsuario />
        <Contato />
      </div>
    </div>
  );
}
