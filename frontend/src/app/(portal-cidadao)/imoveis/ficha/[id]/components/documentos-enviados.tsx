import { Download } from "lucide-react";
import Link from "next/link";

type Documentos = {
  id: string | number
  href: string
  label: string
}

const documentos: Documentos[] = [
  {
    id: 1,
    href: 'relatorio1212210.pdf',
    label: 'relatorio1212210.pdf',
  },
  {
    id: 2,
    href: 'relatorio1212210.pdf',
    label: 'relatorio1212210.pdf',
  }
]

export function DocumentosEnviados() {
  return (
    <div className="bg-white border border-input rounded-3xl px-8 py-6">
      <h2 className="text-xl font-medium">Documentos enviados</h2>

      <div className="space-y-4 mt-6">
        {documentos.map((documento) => (
          <Link
            key={documento.id}
            href={`/imoveis/downloads/${documento.href}`}
            className="flex items-center justify-between bg-[#FDFDFD] hover:bg-muted border border-[#F0F0F0] rounded-2xl py-3 px-6 transition-colors"
            download
          >
            <span>{documento.label}</span>
            <Download />
          </Link>
        ))}
      </div>
    </div>
  )
}
