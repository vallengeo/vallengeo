import { Imoveis, columns } from "./columns"
import { DataTable } from "./data-table"

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
      situacao: "Arquivado",
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

export async function ImoveisCadastrados() {
  const data = await getData();

  return (
    <>
      {data ? (
        <div className="w-full">
          <DataTable columns={columns} data={data} />
        </div>
      ) : (
        <p className="text-center m-auto max-w-[550px]">Você ainda não tem nenhum imóvel cadastrado. Acesse agora o botão <strong>cadastrar</strong> para iniciar o processo de regularização.</p>
      )}
    </>
  )
}
