import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import IUltimosAdicionados from "@/interfaces/Analista/IUltimosAdicionados";

interface UltimosProcessosProps {
  municipio: string;
  ultimosAdicionados: IUltimosAdicionados[];
}

export function UltimosProcessos({
  municipio,
  ultimosAdicionados,
}: UltimosProcessosProps) {
  return (
    <div className="flex flex-col gap-2 bg-white border border-input rounded-3xl p-6">
      <h2 className="text-xl font-semibold">Últimos processos adicionados</h2>

      {ultimosAdicionados.length > 0 ? (
        <>
          <ul className="space-y-2.5">
            {ultimosAdicionados.map((processo) => (
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
