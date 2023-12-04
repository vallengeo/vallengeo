import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import ListaImoveis from "./components/lista-imoveis";

export default function ImoveisPage() {
  return (
    <>
      <Header
        title="Imóveis"
        description={
          <span className="font-medium">Visualização imóveis</span>
        }
      />

      <main className="space-y-6 my-6">
        <div className="flex items-center justify-between bg-white border border-input rounded-3xl p-7">
          <h2 className="text-xl">Cadastrar um<br/> novo imóvel</h2>

          <Button variant="default">
            cadastrar
          </Button>
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