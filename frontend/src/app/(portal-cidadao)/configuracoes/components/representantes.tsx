'use client'

import { useState } from 'react'

import { Avatar } from "@/components/avatar"
import { Button } from "@/components/ui/button"
import { PenSquare } from "lucide-react"
import Link from "next/link"

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'

import { FormRedefinirSenha } from '@/components/profile/form'
import { Pagination } from "@/components/pagination"

const representantes = [
  {
    id: 1,
    avatar: <Avatar />,
    nome: "Davi Luan Manuel da Cruz",
    perfil: "Cidadão",
    cpf: "393.178.226-30",
    rg: "30.390.965-1",
    email: "daviluandacruz@zf-lensysteme.com",
    cep: "25635-201",
    endereco: "Rua Alfredo Schilick",
    numero: "582",
    complemento: "-",
    bairro: "Chácara Flora",
    cidade: "Petrópolis",
    estado: "Rio de janeiro",
    telefone: "(24) 2758-1193"
  },
  {
    id: 2,
    avatar: <Avatar />,
    nome: "Teste Vallengeo",
    perfil: "Cidadão",
    cpf: "393.178.226-30",
    rg: "30.390.965-1",
    email: "teste@vallengeo.com",
    cep: "25635-201",
    endereco: "Rua Alfredo Schilick",
    numero: "582",
    complemento: "-",
    bairro: "Chácara Flora",
    cidade: "Petrópolis",
    estado: "Rio de janeiro",
    telefone: "(24) 2758-1193"
  }
]

export function Representantes() {
  const itemsPerPage = 1;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = representantes.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(representantes.length / itemsPerPage);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="bg-white border border-input rounded-2xl p-6 relative">
      {currentItems.map(representante => (
        <div key={representante.id} className="space-y-6">
          <div className="flex items-start justify-between flex-wrap">
            <div className="flex items-center gap-3">
              {representante.avatar}

              <div className="flex flex-col">
                <span className="text-3xl">{representante.nome}</span>
                <span className="text-2xl font-light">{representante.perfil}</span>

                <div className="flex items-center gap-6">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="link" className="text-link p-0 underline hover:no-underline">
                        Redefinir senha
                      </Button>
                    </DialogTrigger>

                    <DialogContent className="max-w-[580px]">
                      <DialogHeader>
                        <DialogTitle>Redefinir a senha</DialogTitle>
                      </DialogHeader>

                      <div className="py-4 px-6 space-y-7">
                        <div className="flex items-center gap-3">
                          <Avatar />

                          <div className="flex flex-col">
                            <span className="text-3xl">Davi Luan Manuel da Cruz</span>
                            <span className="text-2xl font-light">Cidadão</span>
                          </div>
                        </div>

                        <FormRedefinirSenha />
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Button variant="link" className="text-link p-0 underline hover:no-underline">
                    Upload foto
                  </Button>
                </div>
              </div>
            </div>

            <Link
              href={`/configuracoes/editar/${representante.id}`}
              className="text-lg inline-flex items-center gap-2"
            >
              <PenSquare size={20} />
              Editar
            </Link>
          </div>

          <p>
            <strong className="font-medium text-xl">Representante do imóvel - Proprietário(a)</strong>
          </p>

          <div className="grid grid-cols-4 gap-x-4 gap-y-8">
            <div className="flex flex-col">
              <span className="font-medium text-sm">Nome Completo</span>
              <span>{representante.nome}</span>
            </div>

            <div className="flex flex-col">
              <span className="font-medium text-sm">CPF</span>
              <span>{representante.cpf}</span>
            </div>

            <div className="flex flex-col">
              <span className="font-medium text-sm">RG</span>
              <span>{representante.rg}</span>
            </div>

            <div className="flex flex-col">
              <span className="font-medium text-sm">E-mail</span>
              <span>{representante.email}</span>
            </div>

            <div className="flex flex-col">
              <span className="font-medium text-sm">CEP</span>
              <span>{representante.cep}</span>
            </div>

            <div className="flex flex-col">
              <span className="font-medium text-sm">Endereço</span>
              <span>{representante.endereco}</span>
            </div>

            <div className="flex flex-col">
              <span className="font-medium text-sm">Número</span>
              <span>{representante.numero}</span>
            </div>

            <div className="flex flex-col">
              <span className="font-medium text-sm">Complemento</span>
              <span>{representante.complemento}</span>
            </div>

            <div className="flex flex-col">
              <span className="font-medium text-sm">Bairro</span>
              <span>{representante.bairro}</span>
            </div>

            <div className="flex flex-col">
              <span className="font-medium text-sm">Cidade</span>
              <span>{representante.cidade}</span>
            </div>

            <div className="flex flex-col">
              <span className="font-medium text-sm">Estado</span>
              <span>{representante.estado}</span>
            </div>

            <div className="flex flex-col">
              <span className="font-medium text-sm">Telefone</span>
              <span>{representante.telefone}</span>
            </div>
          </div>
        </div>
      ))}

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        paginate={paginate}
        className="absolute m-0 right-4 bottom-4 justify-normal w-fit"
      />
    </div>
  )
}