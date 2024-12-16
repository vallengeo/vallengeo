import Link from "next/link";
import { Header } from "@/components/header";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { ImoveisCadastrados } from "./components/imoveis-cadastrados";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ConteudoItem } from "@/interfaces/IImovelCadastrados";
import { cadastrados } from "@/service/imovelService";

export const metadata: Metadata = {
  title: "Registro de Imóveis | VallenGeo",
};

async function getData(): Promise<ConteudoItem[]> {
  const response = await cadastrados();

  const data = response.conteudo.map((item: ConteudoItem) => ({
    id: item.id,
    processoId: item.processo.id,
    logradouro: item.informacaoImovel.endereco.logradouro,
    numero: item.informacaoImovel.endereco.numero,
    bairro: item.informacaoImovel.endereco.bairro,
    tipoUsoNome: item.informacaoImovel.tipoUso.nome,
    telefone: "11221211221", // item.contato.telefone,
    situacao: item.processo.situacao,
  }));

  return data;
}

export default async function RegistroImoveisPage({
  params,
}: {
  params: { municipio: string };
}) {
  const data = await getData();

  // para testar carregamento
  // await new Promise(resolve => {
  //   setTimeout(resolve, 30000);
  // })

  return (
    <div className="container space-y-6 py-6 h-full grid grid-rows-[0fr_1fr]">
      <Header title="Imóveis" linkBack={`/${params.municipio}`}>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href={`/${params.municipio}`}>
                Página Inicial
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>/</BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage>Imóveis</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </Header>

      <main role="main" className="grid grid-rows-[0fr_1fr] space-y-6">
        <div className="bg-white border border-input rounded-2xl p-6 flex items-center justify-between gap-4 flex-wrap">
          <h2 className="text-xl font-medium md:max-w-[180px]">
            Cadastrar um novo imóvel
          </h2>
          <Button asChild>
            <Link href={`/${params.municipio}/imoveis/cadastro`}>
              Cadastrar
            </Link>
          </Button>
        </div>

        <div className="bg-white border border-input rounded-2xl p-6 flex items-center justify-center">
          <ImoveisCadastrados data={data} />
        </div>
      </main>
    </div>
  );
}
