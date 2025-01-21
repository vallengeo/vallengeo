"use client";

import { imoveisCadastrados } from "@/service/analista/analistaService";
import { columns } from "./resumo-imoveis/columns";
import { DataTable } from "./resumo-imoveis/data-table";
import { useEffect, useState } from "react";
import { ConteudoItem } from "@/interfaces/IImovelCadastrados";

export function ResumoImoveis() {
  const [data, setData] = useState<ConteudoItem[]>([]);

  useEffect(() => {
    const fetchImoveisCadastrados = async () => {
      const response = await imoveisCadastrados();
      const { conteudo } = response;
      setData(conteudo);
    };

    fetchImoveisCadastrados();
  }, []);

  return (
    <div className="bg-white border border-input rounded-3xl p-4">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
