import Link from "next/link";
import { Avatar } from "../avatar";
import { Button } from "../ui/button";
import { PenSquare } from "lucide-react";

interface MyProfileProps {
  showAddress?: boolean
  openModalChangePassword?: () => void
}

export function MyProfile({ showAddress, openModalChangePassword }: MyProfileProps) {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Avatar width={140} height={135} className="flex-shrink-0" />

        <div className="flex flex-col gap-1 flex-1">
          <span className="text-3xl">Davi Luan Manuel da Cruz</span>
          <span className="text-2xl">Cidadão</span>

          {showAddress && (
            <>
              <Button
                variant="link"
                onClick={openModalChangePassword}
                className="h-auto p-0 justify-start mt-1 w-fit"
              >
                Redefinir senha
              </Button>

              <Link href="/" className="inline-flex items-center gap-1 self-end">
                <PenSquare size={20} />
                Editar
              </Link>
            </>
          )}
        </div>
      </div>

      {showAddress && (
        <div className="grid grid-cols-4 gap-x-4 gap-y-7">
          <div className="flex flex-col text-sm">
            <span className="font-medium">Nome completo</span>
            <span>Davi Luan Manuel da Cruz</span>
          </div>

          <div className="flex flex-col text-sm">
            <span className="font-medium">CPF</span>
            <span>393.178.226-30</span>
          </div>

          <div className="flex flex-col text-sm">
            <span className="font-medium">RG</span>
            <span>30.390.965-1</span>
          </div>

          <div className="flex flex-col text-sm">
            <span className="font-medium">E-mail</span>
            <span>daviluandacruz@zf-lensysteme.com</span>
          </div>

          <div className="flex flex-col text-sm">
            <span className="font-medium">CEP</span>
            <span>25635-201</span>
          </div>

          <div className="flex flex-col text-sm">
            <span className="font-medium">Endereço</span>
            <span>Rua Alfredo Schilick</span>
          </div>

          <div className="flex flex-col text-sm">
            <span className="font-medium">Número</span>
            <span>582</span>
          </div>

          <div className="flex flex-col text-sm">
            <span className="font-medium">Complemento</span>
            <span>-</span>
          </div>

          <div className="flex flex-col text-sm">
            <span className="font-medium">Bairro</span>
            <span>Chácara Flora</span>
          </div>

          <div className="flex flex-col text-sm">
            <span className="font-medium">Cidade</span>
            <span>Petrópolis</span>
          </div>

          <div className="flex flex-col text-sm">
            <span className="font-medium">Estado</span>
            <span>Rio de janeiro</span>
          </div>

          <div className="flex flex-col text-sm">
            <span className="font-medium">Telefone</span>
            <span>(24) 2758-1193</span>
          </div>
        </div>
      )}
    </div>
  )
}