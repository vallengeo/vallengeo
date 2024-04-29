import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

import { PlusCircle } from "lucide-react"

export function HistoricoObservacoes() {
  return (
    <div className="grid grid-rows-[0fr_1fr] bg-white border border-input rounded-3xl px-8 py-6 flex-1 max-w-[440px]">
      <h2 className="text-lg font-bold mb-4">Observações</h2>

      <form className="flex flex-col gap-4">
        <Select name="tipo_assunto">
          <SelectTrigger className="w-full bg-[#EFEFEF]">
            <SelectValue placeholder="Selecione o tipo de assunto" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="localiza-errada">Localização errada</SelectItem>
            <SelectItem value="documentos-faltantes">Documentos faltantes</SelectItem>
            <SelectItem value="informacoes-pendentes">Informações pendentes</SelectItem>
            <SelectItem value="outros">Outros</SelectItem>
          </SelectContent>
        </Select>

        <div className="grid grid-rows-[1fr_0fr] gap-2 border border-input bg-[#EFEFEF] rounded-2xl pt-4 px-4 pb-2 h-full">
          <Textarea
            name="assunto"
            placeholder="Descreva sobre o assunto que deseja"
            className="border-0 bg-transparent"
          />

          <div className="text-right">
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-1"
            >
              Adicionar
              <PlusCircle size={28} strokeWidth={1} />
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
