import { columns } from "./resumo-imoveis/columns";
import { DataTable } from "./resumo-imoveis/data-table";
import { ConteudoItem } from "@/interfaces/IImovelCadastrados";

interface ResumoImoveisProps {
  data: ConteudoItem[];
}

export function ResumoImoveis({ data }: ResumoImoveisProps) {
  return (
    <div className="bg-white border border-input rounded-3xl p-4">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
