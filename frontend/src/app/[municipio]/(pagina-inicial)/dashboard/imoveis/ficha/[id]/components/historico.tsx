import IProtocolo from "@/interfaces/Analista/IProtocolo";

interface HistoricoProps {
  protocolo: IProtocolo;
}

export function Historico({ protocolo }: HistoricoProps) {
  return (
    <div className="flex-1 bg-white border border-input rounded-3xl p-6 overflow-y-auto scrollbar-hide max-h-[410px]">
      <h2 className="text-xl font-medium mb-6">Histórico</h2>

      {protocolo.historicos.length ? (
        <div className="relative pl-8">
          <div className="space-y-6">
            {protocolo.historicos.reverse().map((historico) => (
              <div key={historico.id}>
                <span className="block bg-[#EB5757] size-4 rounded-full absolute left-0 translate-y-1 -translate-x-1.5 z-10"></span>

                <div className="flex flex-col">
                  <span className="font-medium">{historico.titulo}</span>
                  <span>{historico.dataCadastroFormatada}</span>

                  {historico.descricao && (
                    <p className="font-light mt-2">{historico.descricao}</p>
                  )}
                </div>
              </div>
            ))}

            <div>
              <span className="block bg-[#E3E3E3] w-4 h-4 rounded-full absolute left-0 translate-y-1 -translate-x-1.5 z-10"></span>

              <div className="flex flex-col">
                <span className="font-medium">Processo criado com sucesso</span>
                <span>{protocolo.processo.dataCadastroFormatada}</span>
              </div>
            </div>

            <div>
              <span className="block bg-[#8DFA61] w-4 h-4 rounded-full absolute left-0 translate-y-1 -translate-x-1.5 z-10"></span>

              <div className="flex flex-col">
                <span className="font-medium">Protocolo aberto</span>
                <span>{protocolo.processo.dataCadastroFormatada}</span>
              </div>
            </div>

            <div>
              <span className="block bg-black w-4 h-4 rounded-full absolute left-0 translate-y-1 -translate-x-1.5 z-10"></span>

              <div className="flex flex-col">
                <span className="font-medium">
                  Início de cadastro imobiliário
                </span>
                <span>{protocolo.processo.dataCadastroFormatada}</span>
              </div>
            </div>
          </div>

          <div className="w-0.5 bg-input h-[calc(100%_+_20px)] absolute left-0 top-2"></div>
        </div>
      ) : (
        <p>Não há nenhuma observação.</p>
      )}
    </div>
  );
}
