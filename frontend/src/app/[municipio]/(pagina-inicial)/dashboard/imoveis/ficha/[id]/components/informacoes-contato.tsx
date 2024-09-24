export function InformacoesContato() {
  return (
    <div className="bg-white border border-input rounded-3xl px-8 py-6 space-y-6">
      <h2 className="text-xl font-medium">Informações de contato</h2>

      <div className="flex items-start gap-6 text-sm">
        <div className="flex flex-col flex-1">
          <span className="font-medium text-sm">Nome Completo</span>
          <span>Davi Luan Manuel da Cruz</span>
        </div>

        <div className="flex flex-col flex-1">
          <span className="font-medium text-sm">Telefone</span>
          <span>(24) 2758-1193</span>
        </div>

        <div className="flex flex-col flex-1">
          <span className="font-medium text-sm">E-mail</span>
          <span>daviluandacruz@zf-lensysteme.com</span>
        </div>

        <div className="flex flex-col flex-1">
          <span className="font-medium text-sm">Situação</span>
          <span className="inline-flex text-sm whitespace-nowrap font-light bg-[#FACF61] px-2 rounded-3xl w-fit">Aguardando aceite</span>
        </div>
      </div>
    </div>
  )
}
