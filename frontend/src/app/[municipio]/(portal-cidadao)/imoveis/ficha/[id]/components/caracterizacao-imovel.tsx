export function CaracterizacaoImovel() {
  return (
    <div className="bg-white border border-input rounded-3xl px-8 py-6">
      <h2 className="text-xl font-medium">Caracterização do imóvel</h2>

      <div className="md:flex md:justify-between md:flex-wrap grid grid-cols-2 gap-4 mt-6">
        <div className="flex flex-col gap-y-4">
          <span className="font-medium">Setor</span>
          <span>Zona A</span>
        </div>

        <div className="flex flex-col gap-y-4">
          <span className="font-medium">Quadra</span>
          <span>45</span>
        </div>

        <div className="flex flex-col gap-y-4">
          <span className="font-medium">Lote</span>
          <span>896</span>
        </div>

        <div className="flex flex-col gap-y-4">
          <span className="font-medium">Unidade</span>
          <span>01</span>
        </div>

        <div className="flex flex-col gap-y-4">
          <span className="font-medium">Área do terreno</span>
          <span>250 m²</span>
        </div>

        <div className="flex flex-col gap-y-4">
          <span className="font-medium">Testada principal</span>
          <span>10</span>
        </div>

        <div className="flex flex-col gap-y-4">
          <span className="font-medium">Fracção ideal</span>
          <span>123456</span>
        </div>

        <div className="flex flex-col gap-y-4">
          <span className="font-medium">Data de inclusão</span>
          <time dateTime="03-10-2021">03/10/2021</time>
        </div>
      </div>
    </div>
  )
}
