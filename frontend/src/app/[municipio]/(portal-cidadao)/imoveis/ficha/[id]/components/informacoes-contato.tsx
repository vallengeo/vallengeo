import IFicha from "@/interfaces/Analista/IFicha";

interface InformacoesContatoProps {
  ficha: IFicha;
}

export function InformacoesContato({ ficha }: InformacoesContatoProps) {
  const contato = ficha.representantes[0].contato;

  return (
    <div className="bg-white border border-input rounded-3xl p-6 space-y-6">
      <h2 className="text-xl font-medium">Informações de contato</h2>

      <div className="flex items-start flex-col md:flex-row flex-wrap justify-between gap-6">
        <div className="flex flex-col">
          <span className="font-medium text-sm">Nome Completo</span>
          <span>{contato.nome}</span>
        </div>

        <div className="flex flex-col">
          <span className="font-medium text-sm">Telefone</span>
          <span>{contato.telefone}</span>
        </div>

        <div className="flex flex-col">
          <span className="font-medium text-sm">E-mail</span>
          <span className="break-words">{contato.email}</span>
        </div>

        <div className="flex flex-col">
          <span className="font-medium text-sm">Documento</span>
          <span>{contato.documento}</span>
        </div>
      </div>
    </div>
  );
}
