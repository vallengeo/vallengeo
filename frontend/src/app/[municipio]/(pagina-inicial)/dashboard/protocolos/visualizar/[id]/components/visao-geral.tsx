export function VisaoGeral() {
  return (
    <div className="bg-white border border-input rounded-3xl p-6">
      <h2 className="text-lg font-medium mb-3">Visão Geral</h2>

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <div>
          <span className="font-semibold block">Número de cadastro</span>
          <span>50203</span>
        </div>

        <div>
          <span className="font-semibold block">Inscrição imobiliária</span>
          <span>-</span>
        </div>

        <div>
          <span className="font-semibold block">Última atualização</span>
          <span>02/02/2022</span>
        </div>

        <div>
          <span className="font-semibold block">Situação</span>
          <span>Aprovado</span>
        </div>
      </div>
    </div>
  )
}
