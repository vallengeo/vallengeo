import { Imoveis, columns } from "./columns"
import { DataTable } from "./data-table"

async function getData(): Promise<Imoveis[]> {
  return [
    {
      id: 1,
      inscricao_imobiliaria: "999",
      logradouro: "R. Antônio Delgado de Veiga",
      numero: "1234",
      bairro: "Centro",
      cidade: "Taubaté",
      uf: "SP",
      situacao: "Aprovado",
    },
    {
      id: 2,
      inscricao_imobiliaria: "1245678932659589-45",
      logradouro: "Jorge",
      numero: "1234",
      bairro: "Centro",
      cidade: "Taubaté",
      uf: "SP",
      situacao: "Reprovado",
    },
    {
      id: 3,
      inscricao_imobiliaria: "1245678932659589-45",
      logradouro: "R. Antônio Delgado de Veiga",
      numero: "1234",
      bairro: "Centro",
      cidade: "São Paulo",
      uf: "SP",
      situacao: "Em análise",
    },
    {
      id: 4,
      inscricao_imobiliaria: "1245678932659589-45",
      logradouro: "R. Antônio Delgado de Veiga",
      numero: "1234",
      bairro: "Centro",
      cidade: "Taubaté",
      uf: "SP",
      situacao: "Arquivado",
    },
  ]
}

export async function ImoveisCadastrados() {
  const data = await getData();

  return (
    <>
      <div className="w-full">
        <DataTable columns={columns} data={data} />
      </div>
    </>
  )
}
