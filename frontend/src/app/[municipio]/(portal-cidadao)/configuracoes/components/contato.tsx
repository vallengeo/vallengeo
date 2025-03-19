import IPessoa from "@/interfaces/Pessoa/IPessoa";

interface ContatoProps {
  pessoa: IPessoa | null;
}

export function Contato({ pessoa }: ContatoProps) {
  if (!pessoa) {
    return "";
  }
  return (
    <div className="bg-white border border-input rounded-2xl p-6 relative space-y-10">
      <h2 className="font-medium text-xl">Informações de contato</h2>

      <div className="flex items-start justify-between flex-col lg:flex-row flex-wrap gap-x-4 gap-y-8 text-sm">
        <div className="flex flex-col">
          <span className="font-medium">Nome Completo</span>
          <span>{pessoa.nome || pessoa.responsavel?.nome}</span>
        </div>

        <div className="flex flex-col">
          <span className="font-medium">Telefone</span>
          <span>{pessoa.telefone || pessoa.responsavel?.telefone}</span>
        </div>

        <div className="flex flex-col">
          <span className="font-medium">E-mail</span>
          <span>{pessoa.email || pessoa.responsavel?.email}</span>
        </div>

        {pessoa.tipoPessoa === "JURIDICA" && (
          <div className="flex flex-col">
            <span className="font-medium">CNPJ</span>
            <span>
              {pessoa.cnpj}
            </span>
          </div>
        )}

        <div className="flex flex-col">
          <span className="font-medium">CPF</span>
          <span>
            {pessoa.rg}
          </span>
        </div>
      </div>
    </div>
  );
}
