import IFicha from "@/interfaces/Analista/IFicha";

interface InformacoesImovelProps {
  ficha: IFicha;
}

export function InformacoesImovel({ ficha }: InformacoesImovelProps) {
  return (
    <div className="bg-white border border-input rounded-3xl p-6 space-y-6">
      <header className="flex items-center justify-between">
        <h2 className="text-xl font-medium">Informações do imóvel</h2>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8">
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium">
            Tipo de grupo ou ocupação/uso
          </span>
          <span>{ficha.informacaoImovel.tipoUso.nome}</span>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium">CEP</span>
          <span>{ficha.informacaoImovel.endereco.cep}</span>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium">Endereço</span>
          <span>{ficha.informacaoImovel.endereco.logradouro}</span>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium">Bairro</span>
          <span>{ficha.informacaoImovel.endereco.bairro}</span>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium">Complemento</span>
          <span>{ficha.informacaoImovel.endereco.complemento ?? "-"}</span>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium">Número</span>
          <span>{ficha.informacaoImovel.endereco.numero}</span>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium">Cidade</span>
          <span>{ficha.informacaoImovel.endereco.municipio.nome}</span>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium">UF</span>
          <span>{ficha.informacaoImovel.endereco.municipio.estado.nome}</span>
        </div>
      </div>
    </div>
  );
}
