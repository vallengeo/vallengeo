// 'use client'

import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function HistoricoProcessos() {
  return (
    <div className="flex flex-col gap-2 max-w-xl bg-white border border-input rounded-3xl p-6">
      <h2 className="text-xl font-semibold">Histórico de atualizações de processos</h2>

      <ul className="space-y-2.5">
        <li className="bg-[#FDFDFD] hover:bg-muted/50 transition-colors border border-[#F0F0F0] rounded-2xl px-4 py-2">
          <Link href="/protocolos" className="flex items-center justify-between">
            1245678932659589-45
            <ChevronRight className="text-primary" />
          </Link>
        </li>
        <li className="bg-[#FDFDFD] hover:bg-muted/50 transition-colors border border-[#F0F0F0] rounded-2xl px-4 py-2">
          <Link href="/protocolos" className="flex items-center justify-between">
            1245678932659589-45
            <ChevronRight className="text-primary" />
          </Link>
        </li>
      </ul>

      <Button asChild variant="link" className="text-primary w-fit mx-auto">
        <Link href="/protocolos">Visualizar</Link>
      </Button>
    </div>
  )
}