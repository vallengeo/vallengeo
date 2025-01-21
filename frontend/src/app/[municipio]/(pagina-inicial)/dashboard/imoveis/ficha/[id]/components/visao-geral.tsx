import IFicha from "@/interfaces/Analista/IFicha";

interface VisaoGeralProps {
  ficha: IFicha;
}

export function VisaoGeral({ ficha }: VisaoGeralProps) {
  return (
    <div className="bg-white border border-input rounded-3xl px-8 py-6">
      <header className="flex items-center justify-between">
        <h2 className="text-xl font-medium">Visão Geral</h2>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-5">
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium">Número de protocolo</span>
          <span className="underline text-link">{ficha.processo.protocolo}</span>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium">Inscrição imobiliária</span>
          <span>{ficha.inscricaoImobiliaria}</span>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium">Última atualização</span>
          <span>{ficha.processo.ultimaAtualizacaoFormatada}</span>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium">Situação</span>
          <span className="inline-flex text-sm whitespace-nowrap bg-[#FACF61] px-2 rounded-3xl w-fit">
            {ficha.processo.situacao === 'Aguardando finalização de upload de arquivos' ? (
              "Em análise"
            ) : (
              "Completo"
            )}
          </span>
        </div>
      </div>
    </div>
  );
}
