import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Building } from "lucide-react";

interface DownloadFichaProps {
  ficha: string
}

export function DownloadFicha({ ficha }: DownloadFichaProps) {
  return (
    <div className="flex items-center justify-between flex-wrap gap-y-6 bg-white border border-input rounded-3xl px-8 py-4">
      <div className="flex items-center gap-5">
        <Building size={32} />

        <div className="flex flex-col gap-1">
          <span className="text-2xl font-medium">{ficha}</span>
          <span>Davi Luan Manuel da Cruz</span>
        </div>
      </div>

      <Button asChild variant="default">
        <Link href={`/imoveis/download/${ficha}`} download>
          Download ficha
        </Link>
      </Button>
    </div>
  )
}
