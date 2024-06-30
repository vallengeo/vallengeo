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

export type Imoveis = {
  id: string | number
  inscricao_imobiliaria: string
  logradouro: string
  numero: string
  bairro: string
  cidade: string
  uf: string
  situacao: "Aprovado" | "Reprovado" | "Em análise" | "Arquivado"
}

export const columns: ColumnDef<Imoveis>[] = [
  {
    accessorKey: "inscricao_imobiliaria",
    header: ({ column }) => {
      return (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center gap-1"
        >
          Inscrição imobiliária
          <svg width="6" height="5" viewBox="0 0 6 5" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.22389 4.50781C2.97309 4.50781 2.74092 4.37756 2.60804 4.16806L2.58279 4.12506L0.842148 1.06256L0.826948 1.03106C0.783463 0.921397 0.766033 0.802798 0.776081 0.684951C0.786129 0.567105 0.82337 0.453353 0.884763 0.352986C0.946155 0.25262 1.02996 0.168484 1.12933 0.107452C1.2287 0.0464192 1.34081 0.0102206 1.45652 0.00181256L1.50531 -0.000187292L4.93757 -0.000186986L4.94958 0.00056308L4.97704 6.28803e-05C5.08623 0.00579352 5.1928 0.0362782 5.28899 0.0892987C5.38517 0.142319 5.46855 0.216541 5.53306 0.306563L5.55979 0.346563C5.61817 0.440107 5.65549 0.545689 5.66906 0.655707C5.68262 0.765725 5.6721 0.877441 5.63824 0.982813L5.62059 1.03131L5.60588 1.06256L3.86719 4.12081C3.8036 4.23806 3.71037 4.33579 3.5972 4.40385C3.48402 4.4719 3.35503 4.5078 3.22364 4.50781L3.22389 4.50781Z" fill="black" />
          </svg>
        </button>
      )
    },
  },
  {
    accessorKey: "logradouro",
    header: ({ column }) => {
      return (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center gap-1"
        >
          Logradouro
          <svg width="6" height="5" viewBox="0 0 6 5" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.22389 4.50781C2.97309 4.50781 2.74092 4.37756 2.60804 4.16806L2.58279 4.12506L0.842148 1.06256L0.826948 1.03106C0.783463 0.921397 0.766033 0.802798 0.776081 0.684951C0.786129 0.567105 0.82337 0.453353 0.884763 0.352986C0.946155 0.25262 1.02996 0.168484 1.12933 0.107452C1.2287 0.0464192 1.34081 0.0102206 1.45652 0.00181256L1.50531 -0.000187292L4.93757 -0.000186986L4.94958 0.00056308L4.97704 6.28803e-05C5.08623 0.00579352 5.1928 0.0362782 5.28899 0.0892987C5.38517 0.142319 5.46855 0.216541 5.53306 0.306563L5.55979 0.346563C5.61817 0.440107 5.65549 0.545689 5.66906 0.655707C5.68262 0.765725 5.6721 0.877441 5.63824 0.982813L5.62059 1.03131L5.60588 1.06256L3.86719 4.12081C3.8036 4.23806 3.71037 4.33579 3.5972 4.40385C3.48402 4.4719 3.35503 4.5078 3.22364 4.50781L3.22389 4.50781Z" fill="black" />
          </svg>
        </button>
      )
    },
  },
  {
    accessorKey: "numero",
    header: ({ column }) => {
      return (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center gap-1"
        >
          Número e Complemento
          <svg width="6" height="5" viewBox="0 0 6 5" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.22389 4.50781C2.97309 4.50781 2.74092 4.37756 2.60804 4.16806L2.58279 4.12506L0.842148 1.06256L0.826948 1.03106C0.783463 0.921397 0.766033 0.802798 0.776081 0.684951C0.786129 0.567105 0.82337 0.453353 0.884763 0.352986C0.946155 0.25262 1.02996 0.168484 1.12933 0.107452C1.2287 0.0464192 1.34081 0.0102206 1.45652 0.00181256L1.50531 -0.000187292L4.93757 -0.000186986L4.94958 0.00056308L4.97704 6.28803e-05C5.08623 0.00579352 5.1928 0.0362782 5.28899 0.0892987C5.38517 0.142319 5.46855 0.216541 5.53306 0.306563L5.55979 0.346563C5.61817 0.440107 5.65549 0.545689 5.66906 0.655707C5.68262 0.765725 5.6721 0.877441 5.63824 0.982813L5.62059 1.03131L5.60588 1.06256L3.86719 4.12081C3.8036 4.23806 3.71037 4.33579 3.5972 4.40385C3.48402 4.4719 3.35503 4.5078 3.22364 4.50781L3.22389 4.50781Z" fill="black" />
          </svg>
        </button>
      )
    },
  },
  {
    accessorKey: "bairro",
    header: ({ column }) => {
      return (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center gap-1"
        >
          Bairro
          <svg width="6" height="5" viewBox="0 0 6 5" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.22389 4.50781C2.97309 4.50781 2.74092 4.37756 2.60804 4.16806L2.58279 4.12506L0.842148 1.06256L0.826948 1.03106C0.783463 0.921397 0.766033 0.802798 0.776081 0.684951C0.786129 0.567105 0.82337 0.453353 0.884763 0.352986C0.946155 0.25262 1.02996 0.168484 1.12933 0.107452C1.2287 0.0464192 1.34081 0.0102206 1.45652 0.00181256L1.50531 -0.000187292L4.93757 -0.000186986L4.94958 0.00056308L4.97704 6.28803e-05C5.08623 0.00579352 5.1928 0.0362782 5.28899 0.0892987C5.38517 0.142319 5.46855 0.216541 5.53306 0.306563L5.55979 0.346563C5.61817 0.440107 5.65549 0.545689 5.66906 0.655707C5.68262 0.765725 5.6721 0.877441 5.63824 0.982813L5.62059 1.03131L5.60588 1.06256L3.86719 4.12081C3.8036 4.23806 3.71037 4.33579 3.5972 4.40385C3.48402 4.4719 3.35503 4.5078 3.22364 4.50781L3.22389 4.50781Z" fill="black" />
          </svg>
        </button>
      )
    },
  },
  {
    accessorKey: "cidade",
    header: ({ column }) => {
      return (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center gap-1"
        >
          Cidade
          <svg width="6" height="5" viewBox="0 0 6 5" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.22389 4.50781C2.97309 4.50781 2.74092 4.37756 2.60804 4.16806L2.58279 4.12506L0.842148 1.06256L0.826948 1.03106C0.783463 0.921397 0.766033 0.802798 0.776081 0.684951C0.786129 0.567105 0.82337 0.453353 0.884763 0.352986C0.946155 0.25262 1.02996 0.168484 1.12933 0.107452C1.2287 0.0464192 1.34081 0.0102206 1.45652 0.00181256L1.50531 -0.000187292L4.93757 -0.000186986L4.94958 0.00056308L4.97704 6.28803e-05C5.08623 0.00579352 5.1928 0.0362782 5.28899 0.0892987C5.38517 0.142319 5.46855 0.216541 5.53306 0.306563L5.55979 0.346563C5.61817 0.440107 5.65549 0.545689 5.66906 0.655707C5.68262 0.765725 5.6721 0.877441 5.63824 0.982813L5.62059 1.03131L5.60588 1.06256L3.86719 4.12081C3.8036 4.23806 3.71037 4.33579 3.5972 4.40385C3.48402 4.4719 3.35503 4.5078 3.22364 4.50781L3.22389 4.50781Z" fill="black" />
          </svg>
        </button>
      )
    },
  },
  {
    accessorKey: "uf",
    header: ({ column }) => {
      return (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center gap-1"
        >
          UF
          <svg width="6" height="5" viewBox="0 0 6 5" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.22389 4.50781C2.97309 4.50781 2.74092 4.37756 2.60804 4.16806L2.58279 4.12506L0.842148 1.06256L0.826948 1.03106C0.783463 0.921397 0.766033 0.802798 0.776081 0.684951C0.786129 0.567105 0.82337 0.453353 0.884763 0.352986C0.946155 0.25262 1.02996 0.168484 1.12933 0.107452C1.2287 0.0464192 1.34081 0.0102206 1.45652 0.00181256L1.50531 -0.000187292L4.93757 -0.000186986L4.94958 0.00056308L4.97704 6.28803e-05C5.08623 0.00579352 5.1928 0.0362782 5.28899 0.0892987C5.38517 0.142319 5.46855 0.216541 5.53306 0.306563L5.55979 0.346563C5.61817 0.440107 5.65549 0.545689 5.66906 0.655707C5.68262 0.765725 5.6721 0.877441 5.63824 0.982813L5.62059 1.03131L5.60588 1.06256L3.86719 4.12081C3.8036 4.23806 3.71037 4.33579 3.5972 4.40385C3.48402 4.4719 3.35503 4.5078 3.22364 4.50781L3.22389 4.50781Z" fill="black" />
          </svg>
        </button>
      )
    },
  },
  {
    accessorKey: "situacao",
    header: ({ column }) => {
      return (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center gap-1"
        >
          Situação
          <svg width="6" height="5" viewBox="0 0 6 5" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.22389 4.50781C2.97309 4.50781 2.74092 4.37756 2.60804 4.16806L2.58279 4.12506L0.842148 1.06256L0.826948 1.03106C0.783463 0.921397 0.766033 0.802798 0.776081 0.684951C0.786129 0.567105 0.82337 0.453353 0.884763 0.352986C0.946155 0.25262 1.02996 0.168484 1.12933 0.107452C1.2287 0.0464192 1.34081 0.0102206 1.45652 0.00181256L1.50531 -0.000187292L4.93757 -0.000186986L4.94958 0.00056308L4.97704 6.28803e-05C5.08623 0.00579352 5.1928 0.0362782 5.28899 0.0892987C5.38517 0.142319 5.46855 0.216541 5.53306 0.306563L5.55979 0.346563C5.61817 0.440107 5.65549 0.545689 5.66906 0.655707C5.68262 0.765725 5.6721 0.877441 5.63824 0.982813L5.62059 1.03131L5.60588 1.06256L3.86719 4.12081C3.8036 4.23806 3.71037 4.33579 3.5972 4.40385C3.48402 4.4719 3.35503 4.5078 3.22364 4.50781L3.22389 4.50781Z" fill="black" />
          </svg>
        </button>
      )
    },
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
            <Button variant="ghost" className="h-8 w-8 p-0 text-[#AEACAC] data-[state=open]:text-[#70C64D]">
              <span className="sr-only">Abrir menu</span>
              <MoreHorizontal className="h-6 w-6" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="rounded-2xl" align="end">
            <DropdownMenuItem className="justify-center">
              <Link href={`/dashboard/imoveis/ficha/${row.original.id}`}>
                Visualizar
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="justify-center">
              <Link href={`/dashboard/imoveis/relatorio/${row.original.id}`}>
                Relatório
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="justify-center">
              <Link href={`/dashboard/imoveis/arquivar/${row.original.id}`}>
                Arquivar
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
