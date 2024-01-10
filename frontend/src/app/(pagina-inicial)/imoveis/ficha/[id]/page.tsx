
import Header from "@/app/(pagina-inicial)/components/header";
import { Button } from "@/components/ui/button";
import { Building, Download, PenSquare } from "lucide-react";
import Link from "next/link";

export default function FichaImovelPage({ params }: { params: { id: string } }) {
  return (
    <>
      <Header
        title="Ficha de imóvel"
        linkBack="/imoveis"
      >
        <div className="flex items-center gap-1">
          <Link href="/imoveis">Imóveis</Link>
          <span>/</span>
          <span>Ficha de imóvel</span>
          <span>/</span>
          <strong>{params.id}</strong>
        </div>
      </Header>

      <main className="space-y-6 mt-6 mb-4">
        <div className="flex items-center justify-between flex-wrap bg-white border border-input rounded-3xl px-8 py-4">
          <div className="flex items-center gap-5">
            <Building size={32} />

            <div className="flex flex-col gap-1">
              <span className="text-2xl font-medium">{params.id}</span>
              <span>Davi Luan Manuel da Cruz</span>
            </div>
          </div>

          <Button asChild variant="default">
            <Link href={`/imoveis/download/${params.id}`} download>
              Download ficha
            </Link>
          </Button>
        </div>

        <div className="bg-white border border-input rounded-3xl px-8 py-6">
          <header className="flex items-center justify-between">
            <h2 className="text-xl">Visão Geral</h2>

            <Link
              href={`/imoveis/editar/${params.id}`}
              className="flex items-center gap-0.5"
            >
              <PenSquare size={20} />
              Editar
            </Link>
          </header>

          <div className="grid grid-cols-4 gap-4 mt-5">
            <div className="flex flex-col gap-1">
              <span className="font-medium">Número de protocolo</span>
              <span>50203</span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="font-medium">Inscrição imobiliária</span>
              <span>{params.id}</span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="font-medium">Número de protocolo</span>
              <time dateTime="02-02-2022">02/02/2022</time>
            </div>

            <div className="flex flex-col gap-1">
              <span className="font-medium">Situação</span>
              <span className="inline-flex text-sm whitespace-nowrap font-light text-white bg-[#70C64D] px-2 rounded-3xl w-fit">Aprovado</span>
            </div>
          </div>
        </div>

        <div className="bg-white border border-input rounded-3xl px-8 py-6">
          <h2 className="text-xl">Representante do imóvel</h2>

          <div className="grid grid-cols-4 gap-6 mt-6">
            <div className="flex flex-col">
              <span className="font-medium">Nome Completo</span>
              <span>Davi Luan Manuel da Cruz</span>
            </div>

            <div className="flex flex-col">
              <span className="font-medium">CPF</span>
              <span>393.178.226-30</span>
            </div>

            <div className="flex flex-col">
              <span className="font-medium">RG</span>
              <span>30.390.965-1</span>
            </div>

            <div className="flex flex-col">
              <span className="font-medium">E-mail</span>
              <span>daviluandacruz@zf-lensysteme.com</span>
            </div>

            <div className="flex flex-col">
              <span className="font-medium">CEP</span>
              <span>25635-201</span>
            </div>

            <div className="flex flex-col">
              <span className="font-medium">Endereço</span>
              <span>Rua Alfredo Schilick</span>
            </div>

            <div className="flex flex-col">
              <span className="font-medium">Número</span>
              <span>582</span>
            </div>

            <div className="flex flex-col">
              <span className="font-medium">Complemento</span>
              <span>-</span>
            </div>

            <div className="flex flex-col">
              <span className="font-medium">Bairro</span>
              <span>Chácara Flora</span>
            </div>

            <div className="flex flex-col">
              <span className="font-medium">Cidade</span>
              <span>Petrópolis</span>
            </div>

            <div className="flex flex-col">
              <span className="font-medium">Estado</span>
              <span>Rio de Janeiro</span>
            </div>

            <div className="flex flex-col">
              <span className="font-medium">Telefone</span>
              <span>(24) 2758-1193</span>
            </div>
          </div>
        </div>

        <div className="bg-white border border-input rounded-3xl px-8 py-6">
          <h2 className="text-xl">Caracterização do imóvel</h2>

          <div className="flex justify-between flex-wrap gap-4 mt-6">
            <div className="flex flex-col gap-y-4">
              <span className="font-medium">Setor</span>
              <span>Zona A</span>
            </div>

            <div className="flex flex-col gap-y-4">
              <span className="font-medium">Quadra</span>
              <span>45</span>
            </div>

            <div className="flex flex-col gap-y-4">
              <span className="font-medium">Lote</span>
              <span>896</span>
            </div>

            <div className="flex flex-col gap-y-4">
              <span className="font-medium">Unidade</span>
              <span>01</span>
            </div>

            <div className="flex flex-col gap-y-4">
              <span className="font-medium">Área do terreno</span>
              <span>250 m²</span>
            </div>

            <div className="flex flex-col gap-y-4">
              <span className="font-medium">Testada principal</span>
              <span>10</span>
            </div>

            <div className="flex flex-col gap-y-4">
              <span className="font-medium">Fracção ideal</span>
              <span>123456</span>
            </div>

            <div className="flex flex-col gap-y-4">
              <span className="font-medium">Data de inclusão</span>
              <time dateTime="03-10-2021">03/10/2021</time>
            </div>
          </div>
        </div>

        <div className="bg-white border border-input rounded-3xl px-8 py-6">
          <h2 className="text-xl">Georeferenciamento</h2>
        </div>

        <div className="bg-white border border-input rounded-3xl px-8 py-6">
          <h2 className="text-xl">Observações</h2>

          <p>Não há nenhuma observação</p>
        </div>

        <div className="bg-white border border-input rounded-3xl px-8 py-6">
          <h2 className="text-xl">Documentos enviados</h2>

          <div className="space-y-4 mt-6">
            <Link
              href="/imoveis/downloads/relatorio1212210.pdf"
              className="flex items-center justify-between bg-[#FDFDFD] hover:bg-muted border border-[#F0F0F0] rounded-2xl py-3 px-6 transition-colors"
              download
            >
              <span>relatorio1212210.pdf</span>
              <Download />
            </Link>

            <Link
              href="/imoveis/downloads/relatorio1212210.pdf"
              className="flex items-center justify-between bg-[#FDFDFD] hover:bg-muted border border-[#F0F0F0] rounded-2xl py-3 px-6 transition-colors"
              download
            >
              <span>relatorio1212210.pdf</span>
              <Download />
            </Link>

            <Link
              href="/imoveis/downloads/relatorio1212210.pdf"
              className="flex items-center justify-between bg-[#FDFDFD] hover:bg-muted border border-[#F0F0F0] rounded-2xl py-3 px-6 transition-colors"
              download
            >
              <span>relatorio1212210.pdf</span>
              <Download />
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}