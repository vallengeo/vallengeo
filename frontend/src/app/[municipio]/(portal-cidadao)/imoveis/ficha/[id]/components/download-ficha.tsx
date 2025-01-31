import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Building } from "lucide-react";
import IFicha from "@/interfaces/Analista/IFicha";

interface DownloadFichaProps {
  ficha: IFicha;
  fichaDownload: string | null;
}

export async function DownloadFicha({
  ficha,
  fichaDownload,
}: DownloadFichaProps) {
  return (
    <div className="flex items-center justify-between flex-wrap gap-y-6 bg-white border border-input rounded-3xl p-6">
      <div className="flex items-center gap-5">
        <Building size={32} />

        <div className="flex flex-col gap-1">
          <span className="text-2xl font-medium">
            {ficha.inscricaoImobiliaria}
          </span>
          <span>{ficha.representantes[0].nome}</span>
        </div>
      </div>

      {fichaDownload && (
        <Button variant="default">
          <Link href={fichaDownload}>Download ficha</Link>
        </Button>
      )}
    </div>
  );
}
