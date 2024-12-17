import { ConteudoItem } from "@/interfaces/IImovelCadastrados";
import { columns } from "./columns";
import { DataTable } from "./data-table";

interface ImoveisCadastradosProps {
  data: ConteudoItem[]
}

export async function ImoveisCadastrados({ data }: ImoveisCadastradosProps) {
  return (
    <div className="w-full">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
