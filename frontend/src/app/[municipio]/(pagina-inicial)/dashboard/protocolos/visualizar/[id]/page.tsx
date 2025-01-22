import Link from "next/link";

import { Home as LucideHome } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button";

import { Header } from "@/components/header";
import { ArquivarProcesso } from "./components/arquivar-processo";
import { VisaoGeral } from "./components/visao-geral";
import { Historico } from "./components/historico";
import { Observacoes } from "./components/observacoes";

export default function VisualizarProtocolo({
  params
}: {
  params: {
    id: string
    municipio: string
  }
}) {
  return (
    <>
      <Header title="Protocolos">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href={`/${params.municipio}/dashboard`}>Visão Geral</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>/</BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink href={`/${params.municipio}/dashboard/protocolos`}>Protocolos</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>/</BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage>{params.id}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </Header>

      <div className="my-6 space-y-6">
        <div className="bg-white border border-input rounded-3xl p-6 flex items-center justify-between flex-wrap">
          <div className="flex gap-2 items-start">
            <LucideHome size={20} />
            <div>
              <span className="text-lg font-medium block">{params.id}</span>
              <span>Davi Luan Manuel da Cruz</span>
            </div>
          </div>

          <Button variant="default">
            <Link href={`/${params.municipio}/dashboard/imoveis/ficha/1`}>Ficha do imóvel</Link>
          </Button>
        </div>

        <div className="flex gap-6">
          <div className="flex-1 space-y-6">
            <VisaoGeral />
            <Historico />
          </div>

          <Observacoes />
        </div>

        <div className="flex justify-end">
          <ArquivarProcesso />
        </div>
      </div>
    </>
  )
}
