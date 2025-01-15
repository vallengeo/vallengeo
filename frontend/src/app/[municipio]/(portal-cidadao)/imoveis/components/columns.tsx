"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ConteudoItem } from "@/interfaces/IImovelCadastrados";
import { GRUPO_ID } from "@/constants/auth";
import Cookies from 'js-cookie'

export const columns: ColumnDef<ConteudoItem>[] = [
  {
    accessorKey: "imoveis",
    header: () => <div>Imóveis cadastrados</div>,
  },
  {
    accessorKey: "logradouro",
    header: () => <div>Logradouro</div>,
  },
  {
    accessorKey: "numero",
    header: () => <div>Número e Complemento</div>,
  },
  {
    accessorKey: "bairro",
    header: () => <div>Bairro</div>,
  },
  {
    accessorKey: "tipo",
    header: () => <div>Tipo de imóvel</div>,
  },
  {
    accessorKey: "telefone",
    header: () => <div>Telefone</div>,
  },
  {
    accessorKey: "situacao",
    header: () => <div>Situação</div>,
    cell: ({ row }) => {
      let bgSelo = "";

      switch (row.getValue("situacao")) {
        case "Aprovado":
          bgSelo = "bg-[#70C64D]";
          break;
        case "Reprovado":
          bgSelo = "bg-[#DA1C4A]";
          break;
        case "Em análise":
          bgSelo = "bg-[#FFBE5B]";
          break;
        case "Arquivado":
          bgSelo = "bg-[#729397]";
          break;
      }

      return (
        <span
          className={`inline-flex text-sm whitespace-nowrap font-light text-white ${bgSelo} px-2 rounded-3xl`}
        >
          {row.getValue("situacao")}
        </span>
      );
    },
  },
  {
    id: "acoes",
    cell: ({ row }) => {
      const municipio = Cookies.get(GRUPO_ID);

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-8 w-8 p-0 text-[#AEACAC] data-[state=open]:text-[#70C64D]"
            >
              <span className="sr-only">Abrir menu</span>
              <MoreHorizontal className="h-6 w-6" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="rounded-2xl" align="end">
            <DropdownMenuItem className="justify-center">
              <Link
                href={`/${municipio}/imoveis/ficha/${row.original.processo.id}`}
              >
                Visualizar
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="justify-center">
              <Link
                href={`/${municipio}/imoveis/relatorio/${row.original.processo.id}`}
              >
                Relatório
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="justify-center">
              <Link
                href={`/${municipio}/imoveis/arquivar/${row.original.processo.id}`}
              >
                Arquivar
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
