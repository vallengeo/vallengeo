"use client"

import { ColumnDef } from "@tanstack/react-table"

import {
  MoreHorizontal,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import Link from "next/link"

export type Protocolos = {
  id: string | number
  protocolo: string
  inscricao: string
  data: string
  situacao: "Aprovado" | "Reprovado" | "Em análise" | "Arquivado"
}

export const columns: ColumnDef<Protocolos>[] = [
  {
    accessorKey: "protocolo",
    header: () => <div>Protocolos</div>,
  },
  {
    accessorKey: "inscricao",
    header: () => <div>Inscrição imobiliária</div>,
  },
  {
    accessorKey: "data",
    header: () => <div>Data de registro</div>,
  },
  {
    accessorKey: "situacao",
    header: () => <div>Situação</div>,
    cell: ({ row }) => {
      let bgSelo = ''

      switch (row.getValue('situacao')) {
        case 'Aprovado':
          bgSelo = 'bg-[#70C64D]'
          break;
        case 'Reprovado':
          bgSelo = 'bg-[#DA1C4A]'
          break;
        case 'Em análise':
          bgSelo = 'bg-[#FFBE5B]'
          break;
        case 'Arquivado':
          bgSelo = 'bg-[#729397]'
          break;
      }

      return (
        <span className={`inline-flex text-sm whitespace-nowrap font-light text-white ${bgSelo} px-2 rounded-3xl`}>
          {row.getValue('situacao')}
        </span>
      )
    },
  },
  {
    id: "acoes",
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              className="h-8 w-8 p-0 text-[#AEACAC] data-[state=open]:text-[#70C64D]"
            >
              <span className="sr-only">Abrir menu</span>
              <MoreHorizontal className="h-6 w-6" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="rounded-2xl" align="end">
            <DropdownMenuItem className="justify-center">
              <Link href={`/dashboard/protocolos/visualizar/${row.original.id}`}>
                Visualizar
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="justify-center">
              <Link href={`/dashboard/protocolos/relatorio/${row.original.id}`}>
                Relatório
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="justify-center">
              <Link href={`/dashboard/protocolos/arquivar/${row.original.id}`}>
                Arquivar
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
