import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

interface IUltimosProcessos {
  municipio: string
}

export function UltimosProcessos({ municipio }: IUltimosProcessos) {
  return (
    <div className="flex flex-col gap-2 bg-white border border-input rounded-3xl p-6">
      <h2 className="text-xl font-semibold">Últimos processos adicionados</h2>

      <ul className="space-y-2.5">
        <li className="bg-[#FDFDFD] hover:bg-muted/50 transition-colors border border-[#F0F0F0] rounded-2xl">
          <Link
            href={`/${municipio}/dashboard/protocolos/ficha/1`}
            className="flex items-center justify-between px-4 py-2"
          >
            1245678932659589-45
            <ChevronRight className="text-primary" />
          </Link>
        </li>
        <li className="bg-[#FDFDFD] hover:bg-muted/50 transition-colors border border-[#F0F0F0] rounded-2xl">
          <Link
            href={`/${municipio}/dashboard/protocolos/ficha/1`}
            className="flex items-center justify-between px-4 py-2"
          >
            1245678932659589-45
            <ChevronRight className="text-primary" />
          </Link>
        </li>
      </ul>

      <Button asChild variant="link" className="text-primary w-fit mx-auto">
        <Link href={`/${municipio}/dashboard/protocolos`}>Visualizar</Link>
      </Button>
    </div>
  )
}