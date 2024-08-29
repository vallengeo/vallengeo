type Tipos = 'inicio' | 'aberto' | 'criado' | 'pendencia'

type Historico = {
  id: string | number
  tipo: Tipos
  titulo: string
  data: string,
  descricao?: string
}

const historicos: Historico[] = [
  {
    id: 1,
    tipo: 'criado',
    titulo: 'Processo criado com sucesso',
    data: '08/03/2023',
  },
  {
    id: 2,
    tipo: 'pendencia',
    titulo: 'Pendências de documento',
    data: '06/04/2023',
    descricao: 'Está faltando os projetos em dwg.'
  }
]

export function Historico() {
  return (
    <div className="flex-1 bg-white border border-input rounded-3xl px-8 py-6 overflow-hidden">
      <h2 className="text-xl font-medium mb-6">Histórico</h2>

      <div className="relative pl-8">
        <div className="space-y-6">
          {historicos.reverse().map((historico) => (
            <div key={historico.id} className="relative">
              <span className={`block ${getStyleByType(historico.tipo).style} w-4 h-4 rounded-full absolute top-1 left-[-38px] z-10`}></span>

              <div className="flex flex-col">
                <span className="font-medium">{historico.titulo}</span>
                <time dateTime={historico.data}>{historico.data}</time>

                {historico.descricao && (
                  <p className="font-light mt-2">{historico.descricao}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="w-0.5 bg-input h-[calc(100%_+_20px)] absolute left-0 top-2"></div>
      </div>
    </div>
  )
}

function getStyleByType(tipo: Tipos) {
  let style;

  switch (tipo) {
    case 'inicio':
      style = 'bg-black';
      break;

    case 'aberto':
      style = 'bg-[#8DFA61]';
      break;

    case 'criado':
      style = 'bg-[#E3E3E3]';
      break;

    case 'pendencia':
      style = 'bg-[#EB5757]';
      break;
  }

  return {
    style: style
  }
}
