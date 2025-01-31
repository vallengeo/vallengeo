import IFicha from "@/interfaces/Analista/IFicha";
import IProtocolo from "@/interfaces/Analista/IProtocolo";

interface VisaoGeralProps {
  protocolo: IProtocolo;
}

export function VisaoGeral({ protocolo }: VisaoGeralProps) {
  let label = "";
  let background = "";

  switch (protocolo.processo.situacao) {
    case "Aprovado":
      label = "Aprovado";
      background = "bg-[#70C64D]";
      break;
    case "Reprovado":
      label = "Reprovado";
      background = "bg-[#DA1C4A]";
      break;
    case "Aguardando finalização de upload de arquivos":
      label = "Em análise";
      background = "bg-[#FFBE5B]";
      break;
    case "Arquivado":
      label = "Arquivado";
      background = "bg-[#729397]";
      break;
  }

  return (
    <div className="bg-white border border-input rounded-3xl p-6">
      <h2 className="text-lg font-medium mb-3">Visão Geral</h2>

      <div className="flex items-start flex-wrap gap-4">
        <div>
          <span className="font-semibold block">Número de cadastro</span>
          <span>{protocolo.processo.protocolo}</span>
        </div>

        <div>
          <span className="font-semibold block">Inscrição imobiliária</span>
          <span>{protocolo.inscricaoImobiliaria}</span>
        </div>

        <div>
          <span className="font-semibold block">Última atualização</span>
          <span>{protocolo.processo.ultimaAtualizacaoFormatada}</span>
        </div>

        <div>
          <span className="font-semibold block">Situação</span>
          <span
            className={`inline-flex text-sm whitespace-nowrap font-light text-white ${background} px-2 rounded-3xl`}
          >
            {label}
          </span>
        </div>
      </div>
    </div>
  );
}
