import { Button } from "@/components/ui/button";
import { useFormState } from "@/contexts/Imovel/FormContext";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Download } from "lucide-react";

export function CadastroDocumentos() {
  const { onHandleBack, onHandleNext } = useFormState();

  const onHandleSubmit = () => {
    onHandleNext()
  }

  return (
    <form onSubmit={onHandleSubmit} encType="multipart/form-data">
      <div className="bg-white border border-[#E8E1E1] rounded-2xl p-6">
        <header className="flex items-center justify-between mb-1">
          <h2 className="text-xl">Enviar documentos</h2>
          <span className="max-md:hidden">*itens obrigatórios</span>
        </header>

        <p>Anexe os documentos no campo abaixo. Os arquivos aceitos são  shape, dwg, kml e PDF.</p>

        <div className="mt-6 space-y-6">
          <div className="flex flex-col gap-3">
            <span className="font-bold">Habite-se do imóvel*</span>

            <Label className="flex items-center justify-between rounded bg-[#FBFBFB] hover:bg-muted/50 border border-[#E8E1E1] p-6 cursor-pointer transition-colors">
              <Input type="file" accept=".dwg,.kml,.pdf" className="sr-only" />
              <span className="text-[#70C64D] font-bold underline">habitese.pdf</span>
              <Download />
            </Label>
          </div>

          <div className="flex flex-col gap-3">
            <span className="font-bold">Matrícula*</span>

            <Label className="flex items-center justify-between rounded bg-[#FBFBFB] hover:bg-muted/50 border border-[#E8E1E1] p-6 cursor-pointer transition-colors">
              <Input type="file" accept=".dwg,.kml,.pdf" className="sr-only" />
              <span className="text-[#70C64D] font-bold underline">matricula.pdf</span>
              <Download />
            </Label>
          </div>

          <div className="flex flex-col gap-3">
            <span className="font-bold">Documento do proprietário (comprima em um arquivo .ZIP)</span>

            <Label className="flex items-center justify-between rounded bg-[#FBFBFB] hover:bg-muted/50 border border-[#E8E1E1] p-6 cursor-pointer transition-colors">
              <Input type="file" accept=".zip" className="sr-only" />
              <span className="text-[#70C64D] font-bold underline">documentos.rar</span>
              <Download />
            </Label>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between flex-wrap gap-y-4">
              <span className="font-bold">Outros documentos</span>

              <Label className="inline-flex items-center justify-center text-lg font-semibold text-secondary-foreground border border-secondary-foreground hover:bg-primary-hover hover:text-primary-foreground-hover hover:border-transparent cursor-pointer h-10 rounded-3xl px-10 py-2">
                <Input type="file" accept=".dwg,.kml,.pdf" className="sr-only" />
                anexar arquivo
              </Label>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4 mt-6">
        <Button variant="secondary" onClick={onHandleBack}>Voltar</Button>
        <Button>Avançar</Button>
      </div>
    </form>
  )
}