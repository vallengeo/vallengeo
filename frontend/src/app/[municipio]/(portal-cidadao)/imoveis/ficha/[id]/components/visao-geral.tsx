interface VisaoGeralProps {
  ficha: string
}

export function VisaoGeral({ ficha }: VisaoGeralProps) {
  return (
    <div className="bg-white border border-input rounded-3xl px-8 py-6">
      <header className="flex items-center justify-between">
        <h2 className="text-xl font-medium">Visão Geral</h2>
      </header>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-5">
        <div className="flex flex-col gap-1">
          <span className="font-medium">Número de protocolo</span>
          <span>50203</span>
        </div>

        <div className="flex flex-col gap-1">
          <span className="font-medium">Inscrição imobiliária</span>
          <span>{ficha}</span>
        </div>

        <div className="flex flex-col gap-1">
          <span className="font-medium">Número de protocolo</span>
          <time dateTime="02-02-2022">02/02/2022</time>
        </div>

        <div className="flex flex-col gap-1">
          <span className="font-medium">Situação</span>
          <span className="inline-flex text-sm whitespace-nowrap font-light bg-[#FACF61] px-2 rounded-3xl w-fit">Em análise</span>
        </div>
      </div>
    </div>
  )
}
