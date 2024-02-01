import { Imoveis, columns } from "./lista-imoveis/columns"
import { DataTable } from "./lista-imoveis/data-table"

async function getData(): Promise<Imoveis[]> {
  return [
    {
      id: 1,
      imoveis: "1245678932659589-45",
      logradouro: "R. Antônio Delgado de Veiga",
      numero: "1234 - Apt 402",
      bairro: "Centro",
      tipo: "Comercial",
      telefone: "(12) 99361.7871",
      situacao: "Aprovado",
    },
    {
      id: 1,
      imoveis: "1245678932659589-45",
      logradouro: "R. Antônio Delgado de Veiga",
      numero: "1234 - Apt 402",
      bairro: "Centro",
      tipo: "Comercial",
      telefone: "(12) 99361.7871",
      situacao: "Reprovado",
    },
    {
      id: 1,
      imoveis: "1245678932659589-45",
      logradouro: "R. Antônio Delgado de Veiga",
      numero: "1234 - Apt 402",
      bairro: "Centro",
      tipo: "Comercial",
      telefone: "(12) 99361.7871",
      situacao: "Em análise",
    },
    {
      id: 1,
      imoveis: "1245678932659589-45",
      logradouro: "R. Antônio Delgado de Veiga",
      numero: "1234 - Apt 402",
      bairro: "Centro",
      tipo: "Comercial",
      telefone: "(12) 99361.7871",
      situacao: "Cancelado",
    },
    {
      id: 1,
      imoveis: "1245678932659589-45",
      logradouro: "R. Antônio Delgado de Veiga",
      numero: "1234 - Apt 402",
      bairro: "Centro",
      tipo: "Comercial",
      telefone: "(12) 99361.7871",
      situacao: "Reprovado",
    },
    {
      id: 1,
      imoveis: "1245678932659589-45",
      logradouro: "R. Antônio Delgado de Veiga",
      numero: "1234 - Apt 402",
      bairro: "Centro",
      tipo: "Comercial",
      telefone: "(12) 99361.7871",
      situacao: "Aprovado",
    },
    {
      id: 1,
      imoveis: "1245678932659589-45",
      logradouro: "R. Jorge Delgado de Veiga",
      numero: "1234 - Apt 402",
      bairro: "Centro",
      tipo: "Comercial",
      telefone: "(12) 99361.7871",
      situacao: "Em análise",
    },
    {
      id: 2,
      imoveis: "987-000",
      logradouro: "R. Jardim Flores",
      numero: "5678 - Apt 999",
      bairro: "Vila Maria",
      tipo: "Misto",
      telefone: "(81) 99111.3112",
      situacao: "Aprovado",
    },
    // ...
  ]
}

export default async function ListaImoveis() {
  const data = await getData()

  return (
    <div className="bg-white border border-input rounded-3xl p-5">
      <DataTable columns={columns} data={data} />
    </div>
  )
}