'use client'

import { Button } from "@/components/ui/button";
import { useFormState } from "./FormContext";
import { Textarea } from "@/components/ui/textarea";

export function FormImovel() {
  const { onHandleBack } = useFormState();

  return (
    <form className="space-y-6">
      <div className="bg-white border border-[#E8E1E1] rounded-2xl p-6">
        <header className="flex items-center justify-between mb-1">
          <h2 className="text-xl">Informações do imóvel</h2>
          <span>*itens obrigatórios</span>
        </header>

        <p>Informe todos os dados para continuar o processo de cadastramento de imóvel.</p>
      </div>

      <div className="bg-white border border-[#E8E1E1] rounded-2xl p-6">
        <header className="flex items-center justify-between mb-1">
          <h2 className="text-xl">Caracterização do imóvel</h2>
          <span>*itens obrigatórios</span>
        </header>

        <p>Informe todos os dados para continuar o processo de cadastramento de imóvel.</p>
      </div>

      <div className="bg-white border border-[#E8E1E1] rounded-2xl p-6">
        <header className="flex items-center justify-between mb-1">
          <h2 className="text-xl">Georeferenciamento</h2>
        </header>
      </div>

      <div className="bg-white border border-[#E8E1E1] rounded-2xl p-6">
        <header className="flex items-center justify-between mb-1">
          <h2 className="text-xl">Observações</h2>
        </header>

        <div className="mt-6">
          <Textarea/>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Button variant="secondary" onClick={onHandleBack}>Voltar</Button>
        <Button>Finalizar</Button>
      </div>
    </form>
  )
}
