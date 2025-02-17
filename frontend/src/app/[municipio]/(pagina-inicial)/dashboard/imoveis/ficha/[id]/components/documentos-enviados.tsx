import IFicha from "@/interfaces/Analista/IFicha";
import { Download } from "lucide-react";
import Link from "next/link";

interface DocumentosProps {
  ficha: IFicha;
}

export function DocumentosEnviados({ ficha }: DocumentosProps) {
  const documentosEnviados = ficha.documentosEnviados;

  return (
    <div className="bg-white border border-input rounded-3xl p-6 space-y-6">
      <h2 className="text-xl font-medium">Documentos enviados</h2>

      <div>
        {documentosEnviados.length > 0 ? (
          <>
            {documentosEnviados.map((doc) => (
              <Link
                key={doc.id}
                href={`/imoveis/downloads/`}
                download
                className="flex items-center justify-between bg-[#FDFDFD] hover:bg-muted border border-[#F0F0F0] rounded-2xl py-3 px-6 transition-colors"
              >
                <span>{doc.titulo}</span>
                <Download />
              </Link>
            ))}
          </>
        ) : (
          <div className="flex items-center justify-between flex-wrap gap-6">
            <p>Nenhum documento enviado.</p>
          </div>
        )}
      </div>
    </div>
  );
}
