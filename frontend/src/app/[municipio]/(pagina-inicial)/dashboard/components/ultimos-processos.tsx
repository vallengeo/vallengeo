"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { ultimosAdicionados } from "@/service/analista/analistaService";
import IUltimosAdicionados from "@/interfaces/Analista/IUltimosAdicionados";

export function UltimosProcessos() {
  const pathname = usePathname();
  const municipio = pathname.split("/")[1];

  const [processos, setProcessos] = useState<IUltimosAdicionados[]>([]);

  useEffect(() => {
    const fetchUltimosAdicionados = async () => {
      try {
        const response = await ultimosAdicionados();
        setProcessos(response.data);
      } catch (error) {
        console.error("Erro ao buscar últimos processos adicionados:", error);
      }
    };

    fetchUltimosAdicionados();
  }, []);

  return (
    <div className="flex flex-col gap-2 bg-white border border-input rounded-3xl p-6">
      <h2 className="text-xl font-semibold">Últimos processos adicionados</h2>

      {processos.length > 0 ? (
        <>
          <ul className="space-y-2.5">
            {processos.map((processo) => (
              <li
                key={processo.id}
                className="bg-[#FDFDFD] hover:bg-muted/50 transition-colors border border-[#F0F0F0] rounded-2xl"
              >
                <Link
                  href={`/${municipio}/dashboard/protocolos/visualizar/${processo.id}`}
                  className="flex items-center justify-between px-4 py-2"
                >
                  {processo.id}
                  <ChevronRight className="text-primary" />
                </Link>
              </li>
            ))}
          </ul>

          <Button asChild variant="link" className="text-primary w-fit mx-auto">
            <Link href={`/${municipio}/dashboard/protocolos`}>Visualizar</Link>
          </Button>
        </>
      ) : (
        <p className="text-center my-6">Nenhum processo encontrado.</p>
      )}
    </div>
  );
}
