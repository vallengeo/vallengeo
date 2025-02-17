"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { ultimosAlterados } from "@/service/analista/analistaService";
import IUltimosAlterados from "@/interfaces/Analista/IUltimosAlterados";

interface HistoricoProcessosProps {
  municipio: string;
  ultimosAlterados: IUltimosAlterados[];
}

export function HistoricoProcessos({
  municipio,
  ultimosAlterados,
}: HistoricoProcessosProps) {
  return (
    <div className="flex flex-col gap-2 bg-white border border-input rounded-3xl p-6">
      <h2 className="text-xl font-semibold">
        Histórico de atualizações de processos
      </h2>

      {ultimosAlterados.length > 0 ? (
        <>
          <ul className="space-y-2.5">
            {ultimosAlterados.map((processo) => (
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
