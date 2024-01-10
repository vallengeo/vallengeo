import Header from "../components/header";
import ListaImoveis from "./components/lista-imoveis";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import CadastroTipoPessoa from "./components/cadastro/tipo-pessoa";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Imóveis - VallenGeo',
}

export default function ImoveisPage() {
  return (
    <>
      <Header
        title="Imóveis"
      >
       <span className="font-medium">Visualização imóveis</span>
      </Header>

      <main className="space-y-6 my-6">
        <div className="flex items-center justify-between bg-white border border-input rounded-3xl p-7">
          <h2 className="text-xl">Cadastrar um<br/> novo imóvel</h2>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="default">
                cadastrar
              </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[1186px] bg-[#FCFCFC] gap-y-16 max-md:gap-y-6 pb-12">
              <DialogHeader>
                <DialogTitle className="text-[2rem] max-md:text-2xl max-md:pr-10 font-semibold">
                  Selecione o tipo de pessoa que deseja cadastrar
                </DialogTitle>
              </DialogHeader>

              <CadastroTipoPessoa/>
            </DialogContent>
          </Dialog>
        </div>

        <div className="bg-white border border-input rounded-3xl">
          <h2 className="text-xl px-6 py-4">Resumo de imóveis</h2>

          <div className="text-center">Mapa</div>
        </div>

        <ListaImoveis/>
      </main>
    </>
  )
}