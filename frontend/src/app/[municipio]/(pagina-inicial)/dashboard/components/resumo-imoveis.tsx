import { Imoveis, columns } from "./resumo-imoveis/columns"
import { DataTable } from "./resumo-imoveis/data-table"

async function getData(): Promise<Imoveis[]> {
  return [
    {
      id: "1",
      cadastro: "1245678932659589-45",
      endereco: "R. Antônio Delgado de Veiga  1234, Centro, Taubaté -SP",
      tipo_imovel: "Comercial",
    },
    {
      id: "2",
      cadastro: "1245678932659589-99",
      endereco: "R. Antônio Delgado de Veiga  7890, Centro, Taubaté -SP",
      tipo_imovel: "Misto",
    },
    {
      id: "3",
      cadastro: "1245678932659589-11",
      endereco: "R. Antônio Delgado de Veiga  4561, Centro, Taubaté -SP",
      tipo_imovel: "Residencial",
    },
    {
      id: "4",
      cadastro: "1245678932659589-11",
      endereco: "R. Antônio Delgado de Veiga  4561, Centro, Taubaté -SP",
      tipo_imovel: "Residencial",
    },
    {
      id: "5",
      cadastro: "1245678932659589-11",
      endereco: "R. Antônio Delgado de Veiga  4561, Centro, Taubaté -SP",
      tipo_imovel: "Residencial",
    },
    {
      id: "6",
      cadastro: "1245678932659589-11",
      endereco: "R. Antônio Delgado de Veiga  4561, Centro, Taubaté -SP",
      tipo_imovel: "Residencial",
    },
    {
      id: "7",
      cadastro: "1245678932659589-11",
      endereco: "R. Antônio Delgado de Veiga  4561, Centro, Taubaté -SP",
      tipo_imovel: "Residencial",
    },
    // ...
  ]
}

export async function ResumoImoveis() {
  const data = await getData()

  return (
    <div className="bg-white border border-input rounded-3xl p-4">
      <h2 className="text-xl font-medium mb-6">Resumo dos imoveis</h2>

      <div>
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  )
}