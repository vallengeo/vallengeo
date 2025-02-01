import ITotalizadores from "@/interfaces/Analista/ITotalizadores";

interface TotalizadoresProps {
  totalizadores: ITotalizadores;
}

export function Totalizadores({ totalizadores }: TotalizadoresProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      <div className="flex flex-col gap-1 bg-white border border-input rounded-3xl p-8">
        <p className="text-lg/5 font-medium">
          Total de
          <br /> cadastros
        </p>
        <p className="text-[2rem] font-semibold">{totalizadores.total}</p>
      </div>

      <div className="flex flex-col gap-1 bg-white border border-input rounded-3xl p-8">
        <p className="text-lg/5 font-medium">
          Novos
          <br /> cadastros
        </p>
        <p className="text-[2rem] font-semibold">{totalizadores.novo}</p>
      </div>

      <div className="flex flex-col gap-1 bg-white border border-input rounded-3xl p-8">
        <p className="text-lg/5 font-medium">
          Em
          <br /> andamento
        </p>
        <p className="text-[2rem] font-semibold">{totalizadores.andamento}</p>
      </div>

      <div className="flex flex-col gap-1 bg-white border border-input rounded-3xl p-8">
        <p className="text-lg/5 font-medium">
          Processos
          <br /> finalizados
        </p>
        <p className="text-[2rem] font-semibold">{totalizadores.finalizado}</p>
      </div>
    </div>
  );
}
