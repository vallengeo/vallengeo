import { ConteudoItem } from "@/interfaces/IImovelCadastrados";
import { columns } from "./columns";
import { DataTable } from "./data-table";

interface ListaProtocolosProps {
  data: ConteudoItem[];
}

export function ListaProtocolos({ data }: ListaProtocolosProps) {
  return (
    <>
      <div className="w-full">
        <DataTable columns={columns} data={data} />
      </div>
    </>
  );
}
