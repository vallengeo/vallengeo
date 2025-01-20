"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Filter, Search } from "lucide-react";
import {
  ColumnDef,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Legenda } from "./legenda";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    initialState: {
      pagination: {
        pageSize: 6,
      },
    },
    state: {
      sorting,
      columnVisibility,
    },
  });

  return (
    <>
      <div>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-medium">Resumo dos imóveis</h2>

          <div className="flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="inline-flex justify-center items-center h-8 w-8 border border-primary-foreground rounded">
                  <Search size={18} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="left"
                align="center"
                className="border-none bg-transparent shadow-none"
              >
                <Input
                  type="search"
                  placeholder="Pesquisar imóvel"
                  value={
                    (table
                      .getColumn("inscricaoImobiliaria")
                      ?.getFilterValue() as string) ?? ""
                  }
                  onChange={(event) =>
                    table
                      .getColumn("inscricaoImobiliaria")
                      ?.setFilterValue(event.target.value)
                  }
                  className="max-w-sm"
                />
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="inline-flex justify-center items-center h-8 w-8 border border-primary-foreground rounded">
                  <Filter size={18} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48" align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    let label = "";

                    switch (column.id) {
                      case "inscricaoImobiliaria":
                        label = "Inscrição imobiliária";
                        break;
                      case "informacaoImovel_endereco_logradouro":
                        label = "Logradouro";
                        break;
                      case "informacaoImovel_endereco_numero":
                        label = "Número e complemento";
                        break;
                      case "informacaoImovel_endereco_bairro":
                        label = "Bairro";
                        break;
                      case "informacaoImovel_endereco_municipio_nome":
                        label = "Cidade";
                        break;
                      case "informacaoImovel_endereco_municipio_estado_uf":
                        label = "UF";
                        break;
                      case "processo_situacao":
                        label = "Situação";
                        break;
                      case "informacaoImovel_tipoUso_nome":
                        label = "Tipo de imóvel";
                        break;
                      case "acoes":
                        label = "Ações";
                        break;
                    }

                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {label}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div>
          <Table className="border-separate border-spacing-y-2">
            {table.getRowModel().rows?.length ? (
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow
                    key={headerGroup.id}
                    className="hover:bg-transparent border-0"
                  >
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead
                          key={header.id}
                          className="text-primary-foreground font-semibold h-auto pb-1"
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
            ) : (
              ""
            )}

            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="bg-[#FDFDFD]"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className="border-t border-b first:border-l last:border-r border-t-[#F0F0F0] border-b-[#F0F0F0] first:border-l-[#F0F0F0] last:border-l-[#F0F0F0] first:rounded-l-2xl last:rounded-r-2xl py-1 px-6"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <div className="min-h-[350px] grid">
                  <div className="text-center m-auto max-w-[645px]">
                    <p>Sem resultados.</p>
                  </div>
                </div>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-end max-md:flex-col gap-2 py-4">
          <Legenda className="flex-1" />

          <div className="space-x-2">
            <Button
              variant="default"
              className="text-white bg-[#70C64D] rounded-full p-0 w-6 h-6 m-0"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronLeft size={16} />
            </Button>
            <Button
              variant="default"
              className="text-white bg-[#70C64D] rounded-full p-0 w-6 h-6 m-0"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <ChevronRight size={16} />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
