import Link from "next/link";
import { Avatar } from "../avatar";
import { Button } from "../ui/button";
import { PenSquare } from "lucide-react";

interface MyProfileProps {
  showAddress?: boolean;
  openModalChangePassword?: () => void;
}

export function MyProfile({
  showAddress,
  openModalChangePassword,
}: MyProfileProps) {
  return (
    <div className="space-y-8">
      <div className="flex flex-col lg:flex-row items-center gap-4">
        <Avatar width={140} height={135} className="flex-shrink-0" />

        <div className="flex items-center lg:items-start flex-col gap-1 flex-1">
          <span className="text-2xl md:text-3xl">Davi Luan Manuel da Cruz</span>
          <span className="text-xl md:text-2xl">Cidadão</span>

          {showAddress && (
            <div className="flex items-center md:justify-between gap-3 w-full">
              <Button
                variant="link"
                onClick={openModalChangePassword}
                className="h-auto p-0 justify-start lg:mt-1 w-fit"
              >
                Redefinir senha
              </Button>

              <span className="h-4 w-px bg-foreground block lg:hidden"></span>

              <Button
                asChild
                variant="link"
                onClick={openModalChangePassword}
                className="h-auto p-0 w-fit"
              >
                <Link
                  href="/"
                  className="inline-flex items-center gap-1 md:no-underline"
                >
                  <PenSquare size={20} className="hidden lg:block" />
                  Editar
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>

      {showAddress && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-7">
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
  );
}
