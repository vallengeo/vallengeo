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
import IPessoa from "@/interfaces/Pessoa/IPessoa";
import { buscarPessoaPorId, listarPessoas } from "@/service/pessoa";
import { cookies } from "@/lib/utils";
import { ACCESS_TOKEN } from "@/constants/auth";

export const metadata: Metadata = {
  title: "Configurações | VallenGeo",
};

async function getPessoas(): Promise<IPessoa[] | null> {
  try {
    const response = await listarPessoas();
    return response;
  } catch (error) {
    console.error("Erro ao buscar os dados:", error);
    return null;
  }
}

async function getPessoa(id: string, token: string): Promise<IPessoa | null> {
  try {
    const response = await buscarPessoaPorId(id, token);
    return response;
  } catch (error) {
    console.error("Erro ao buscar os dados:", error);
    return null;
  }
}

export default async function CidadaoConfiguracoesPage({
  params,
}: {
  params: { municipio: string };
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get(ACCESS_TOKEN).value;

  const listarPessoas = await getPessoas();
  const pessoa = await getPessoa("bc517475-2c86-48b2-bd98-1e3e8626d039", token);

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
        <PerfilUsuario pessoa={pessoa} listarPessoas={listarPessoas} />
        <Contato pessoa={pessoa} />
      </div>
    </div>
  );
}
