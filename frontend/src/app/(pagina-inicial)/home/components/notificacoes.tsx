import { Bell, ChevronRight } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import NotificacoesRecentes from "./notificacoes/recentes";

export default function Notificacoes() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex items-center justify-center text-left w-fit gap-6 bg-white border border-input rounded-3xl py-14 px-6 max-md:mx-auto">
          <div className="flex items-center justify-center flex-[0_0_auto] bg-primary w-11 h-11 rounded-full">
            <Bell />
          </div>

          <p className="max-w-[215px]">
            Enquanto esteve fora houveram <strong>7 novidades</strong> na plataforma.
          </p>

          <ChevronRight size={40} strokeWidth={1} className="text-primary flex-[0_0_auto]" />
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[1186px] bg-[#FCFCFC] rounded-3xl">
        <DialogHeader>
          <DialogTitle className="text-[2rem] font-semibold">
            Notificações
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-2 mt-3">
          <NotificacoesRecentes/>
        </div>
      </DialogContent>
    </Dialog>
  )
}