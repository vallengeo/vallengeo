import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export function ArquivarProcesso() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="secondary"
        >
          Arquivar processo
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[860px] pb-4">
        <DialogHeader className="bg-transparent">
          <DialogTitle className="text-xl font-medium">Arquivar processo</DialogTitle>
        </DialogHeader>

        <form>
          <div className="px-6">
            <Textarea
              name="descricao"
              className="border-0 bg-transparent bg-[#EFEFEF] rounded-2xl"
            />

            <div className="flex items-center gap-4 my-6">
              <Button asChild variant="secondary">
                <span>anexar arquivo</span>
              </Button>

              <span>Nenhum arquivo selecionado.</span>
            </div>
          </div>

          <div className="flex items-center justify-between bg-[#FCFCFC] px-6">
            <label>
              <input type="checkbox" name="confirm" />
              Estou ciente que este processo é irreversível segundo a legislação.
            </label>

            <div className="flex items-center gap-6">
              <Button variant="secondary">Confirmar</Button>
              <Button>Desistir</Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
