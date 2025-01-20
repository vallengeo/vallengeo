import IFicha from "@/interfaces/Analista/IFicha";

interface CaracterizacaoImovelProps {
  ficha: IFicha;
}

export function CaracterizacaoImovel({ ficha }: CaracterizacaoImovelProps) {
  const caracterizacao = ficha.caracterizacaoImovel;

  return (
    <div className="bg-white border border-input rounded-3xl px-8 py-6 space-y-6">
      <h2 className="text-xl font-medium">Caracterização do imóvel</h2>

      <div className="flex items-start flex-col md:flex-row flex-wrap justify-between gap-6">
        <div className="flex flex-col gap-y-4">
          <span className="font-medium text-sm">Setor</span>
          <span>{caracterizacao.setor}</span>
        </div>

        <div className="flex flex-col gap-y-4">
          <span className="font-medium text-sm">Quadra</span>
          <span>{caracterizacao.quadra}</span>
        </div>

        <div className="flex flex-col gap-y-4">
          <span className="font-medium text-sm">Lote</span>
          <span>{caracterizacao.lote}</span>
        </div>

        <div className="flex flex-col gap-y-4">
          <span className="font-medium text-sm">Unidade</span>
          <span>{caracterizacao.unidade}</span>
        </div>

        <div className="flex flex-col gap-y-4">
          <span className="font-medium text-sm">Área do terreno</span>
          <span>{caracterizacao.areaTerrenoFormatada}</span>
        </div>

        <div className="flex flex-col gap-y-4">
          <span className="font-medium text-sm">Testada principal</span>
          <span>{caracterizacao.testadaPrincipalFormatada}</span>
        </div>

        <div className="flex flex-col gap-y-4">
          <span className="font-medium text-sm">Fracção ideal</span>
          <span>{caracterizacao.fracaoIdealFormatada}</span>
        </div>

        <div className="flex flex-col gap-y-4">
          <span className="font-medium text-sm">Data de inclusão</span>
          <span>{caracterizacao.dataInclusaoFormatada}</span>
        </div>
      </div>
    </div>
  );
}
