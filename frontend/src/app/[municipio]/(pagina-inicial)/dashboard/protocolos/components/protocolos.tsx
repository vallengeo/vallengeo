import { Protocolos, columns } from "./columns"
import { DataTable } from "./data-table"

async function getData(): Promise<Protocolos[]> {
  return [
    {
      id: 1,
      protocolo: '1245678932659589-45',
      inscricao: '1245678932659589-45',
      data: '01/07/23',
      situacao: 'Aprovado'
    },
    {
      id: 2,
      protocolo: '1245678932659589-45',
      inscricao: '1245678932659589-45',
      data: '01/07/23',
      situacao: 'Arquivado'
    },
    {
      id: 3,
      protocolo: '1245678932659589-45',
      inscricao: '1245678932659589-45',
      data: '01/07/23',
      situacao: 'Em análise'
    },
    {
      id: 4,
      protocolo: '987-10',
      inscricao: '1245678932659589-45',
      data: '01/07/23',
      situacao: 'Reprovado'
    },
  ]
}

export async function ListaProtocolos() {
  const data = await getData();

  return (
    <>
      <div className="w-full">
        <DataTable columns={columns} data={data} />
      </div>
    </>
  )
}
