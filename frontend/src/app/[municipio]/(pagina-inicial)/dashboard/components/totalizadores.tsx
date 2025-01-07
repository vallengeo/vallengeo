"use client";

import ITotalizadores from "@/interfaces/Analista/ITotalizadores";
import { totalizadoresProcesso } from "@/service/analista/analistaService";
import { useEffect, useState } from "react";

export function Totalizadores() {
  const [processo, setProcesso] = useState<ITotalizadores>({
    total: 0,
    novo: 0,
    andamento: 0,
    finalizado: 0,
  });

  useEffect(() => {
    const fetchTotalizadores = async () => {
      try {
        const response = await totalizadoresProcesso();
        setProcesso(response.data);
      } catch (error) {
        console.error("Erro ao buscar totalizadores:", error);
      }
    };

    fetchTotalizadores();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      <div className="flex flex-col gap-1 bg-white border border-input rounded-3xl p-8">
        <p className="text-lg/5 font-medium">
          Total de
          <br /> cadastros
        </p>
        <p className="text-[2rem] font-semibold">{processo?.total}</p>
      </div>

      <div className="flex flex-col gap-1 bg-white border border-input rounded-3xl p-8">
        <p className="text-lg/5 font-medium">
          Novos
          <br /> cadastros
        </p>
        <p className="text-[2rem] font-semibold">{processo?.novo}</p>
      </div>

      <div className="flex flex-col gap-1 bg-white border border-input rounded-3xl p-8">
        <p className="text-lg/5 font-medium">
          Em
          <br /> andamento
        </p>
        <p className="text-[2rem] font-semibold">{processo?.andamento}</p>
      </div>

      <div className="flex flex-col gap-1 bg-white border border-input rounded-3xl p-8">
        <p className="text-lg/5 font-medium">
          Processos
          <br /> finalizados
        </p>
        <p className="text-[2rem] font-semibold">{processo?.finalizado}</p>
      </div>
    </div>
  );
}
