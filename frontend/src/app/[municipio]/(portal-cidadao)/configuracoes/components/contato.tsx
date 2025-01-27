export function Contato() {
  return (
    <div className="bg-white border border-input rounded-2xl p-6 relative space-y-10">
      <h2 className="font-medium text-xl">Perfil de usuário</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8">
        <div className="flex flex-col">
          <span className="font-medium text-sm">Nome Completo</span>
          <span>Davi Luan Manuel da Cruz</span>
        </div>

        <div className="flex flex-col">
          <span className="font-medium text-sm">Telefone</span>
          <span>(24) 2758-1193</span>
        </div>

        <div className="flex flex-col">
          <span className="font-medium text-sm">E-mail</span>
          <span>daviluandacruz@zf-lensysteme.com</span>
        </div>

        <div className="flex flex-col">
          <span className="font-medium text-sm">Documento</span>
          <span>393.178.226-30</span>
        </div>
      </div>
    </div>
  );
}
