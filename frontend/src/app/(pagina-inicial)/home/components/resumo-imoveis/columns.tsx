"use client"

import { ColumnDef } from "@tanstack/react-table"
import {
  ArrowUpDown,
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

export type Imoveis = {
  id: string
  cadastro: string
  endereco: string
  tipo_imovel: "Comercial" | "Residencial" | "Misto"
}

export const columns: ColumnDef<Imoveis>[] = [
  {
    accessorKey: "cadastro",
    header: ({ column }) => {
      return (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center"
        >
          cadastros
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </button>
      )
    },
  },
  {
    accessorKey: "endereco",
    header: ({ column }) => {
      return (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center"
        >
          endereço
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </button>
      )
    },
  },
  {
    accessorKey: "tipo_imovel",
    header: ({ column }) => {
      return (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center"
        >
          tipo de imóvel
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </button>
      )
    },
    cell: ({ row }) => {
      let bgSelo = ''

      switch (row.getValue('tipo_imovel')) {
        case 'Comercial':
          bgSelo = 'bg-[#005074]'
          break;
        case 'Residencial':
          bgSelo = 'bg-[#6AC09B]'
          break;
        case 'Misto':
          bgSelo = 'bg-[#729397]'
          break;
      }

      return (
        <div className={`text-sm font-light text-white ${bgSelo} w-fit px-2 rounded-3xl`}>
          {row.getValue('tipo_imovel')}
        </div>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir menu</span>
              <MoreHorizontal className="h-6 w-6 text-[#AEACAC]" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="rounded-2xl" align="end">
            <DropdownMenuItem className="justify-center">
              <Link href={`/imoveis/visualizar/${row.original.id}`}>
                Visualizar
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="justify-center">
              <Link href={`/imoveis/editar/${row.original.id}`}>
                Editar
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="justify-center">
              <Link href={`/imoveis/download/${row.original.id}`} download>
                Download
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="justify-center">
              <Link href={`/imoveis/arquivar/${row.original.id}`}>
                Arquivar
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
