import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function NotificacoesRecentes() {
  return (
    <>
      <Link
        href="/"
        className="flex items-center justify-between bg-[#FDFDFD] hover:bg-muted/50 transition-colors border border-[#F0F0F0] rounded-2xl p-2"
      >
        <p className="ml-4">Nova atualização na inscrição imobiliária <strong>{'1245678932659589-45'}</strong>. Acesse ao lado para ser redirecionado ao imóvel.</p>
        <ChevronRight className="text-primary flex-shrink-0" />
      </Link>

      <Link
        href="/"
        className="flex items-center justify-between bg-[#FDFDFD] hover:bg-muted/50 transition-colors border border-[#F0F0F0] rounded-2xl p-2"
      >
        <p className="ml-4">Nova atualização na inscrição imobiliária <strong>{'1245678932659589-45'}</strong>. Acesse ao lado para ser redirecionado ao imóvel.</p>
        <ChevronRight className="text-primary flex-shrink-0" />
      </Link>

      <Link
        href="/"
        className="flex items-center justify-between bg-[#FDFDFD] hover:bg-muted/50 transition-colors border border-[#F0F0F0] rounded-2xl p-2"
      >
        <p className="ml-4">Nova atualização na inscrição imobiliária <strong>{'1245678932659589-45'}</strong>. Acesse ao lado para ser redirecionado ao imóvel.</p>
        <ChevronRight className="text-primary flex-shrink-0" />
      </Link>

      <Link
        href="/"
        className="flex items-center justify-between bg-[#FDFDFD] hover:bg-muted/50 transition-colors border border-[#F0F0F0] rounded-2xl p-2"
      >
        <p className="ml-4">Nova atualização na inscrição imobiliária <strong>{'1245678932659589-45'}</strong>. Acesse ao lado para ser redirecionado ao imóvel.</p>
        <ChevronRight className="text-primary flex-shrink-0" />
      </Link>
    </>
  )
}