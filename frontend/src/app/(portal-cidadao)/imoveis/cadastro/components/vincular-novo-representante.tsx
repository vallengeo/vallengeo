import { Button } from "@/components/ui/button";

export function VincularNovoRepresentante() {
  return (
    <>
      <div className="border-t border-t-[#E8E1E1] pt-6 flex items-center justify-between flex-wrap">
        <h2 className="text-xl font-medium">Deseja vincular um novo representante ao imóvel?</h2>

        <div className="flex items-center gap-6">
          <Button variant="secondary">Limpar</Button>
          <Button variant="default">Acessar</Button>
        </div>
      </div>
    </>
  )
}
