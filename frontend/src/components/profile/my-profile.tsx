"use client";

import Link from "next/link";
import { Avatar } from "../avatar";
import { Button } from "../ui/button";
import { PenSquare } from "lucide-react";
import IPessoa from "@/interfaces/Pessoa/IPessoa";
import { usePathname } from "next/navigation";

interface MyProfileProps {
  pessoa?: IPessoa;
  cargo?: string;
  showAddress?: boolean;
  openModalChangePassword?: () => void;
}

export function MyProfile({
  pessoa,
  cargo = "Analista",
  showAddress,
  openModalChangePassword,
}: MyProfileProps) {
  const pathname = usePathname();
  const idMunicipio = pathname.split("/")[1];

  return (
    <>
      {pessoa ? (
        <div className="space-y-8">
          <div className="flex items-center gap-4">
            <Avatar nome={pessoa?.nome} className="flex-shrink-0 text-5xl" />

            <div className="flex items-start flex-col gap-1 flex-1">
              <span className="text-xl sm:text-2xl md:text-3xl line-clamp-1">
                {pessoa?.nome}
              </span>
              <span className="text-lg sm:text-xl md:text-2xl font-light">
                {cargo}
              </span>

              {showAddress && (
                <div className="flex items-center lg:justify-between gap-3 w-full">
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
                      className="inline-flex items-center gap-1 lg:no-underline"
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
                <span>{pessoa.nome}</span>
              </div>

              <div className="flex flex-col text-sm">
                <span className="font-medium">CPF</span>
                <span>{pessoa.cpf}</span>
              </div>

              <div className="flex flex-col text-sm">
                <span className="font-medium">RG</span>
                <span>{pessoa.rg}</span>
              </div>

              <div className="flex flex-col text-sm">
                <span className="font-medium">E-mail</span>
                <span>{pessoa.email}</span>
              </div>

              <div className="flex flex-col text-sm">
                <span className="font-medium">CEP</span>
                <span>{pessoa.endereco.cep}</span>
              </div>

              <div className="flex flex-col text-sm">
                <span className="font-medium">Endereço</span>
                <span>{pessoa.endereco.logradouro}</span>
              </div>

              <div className="flex flex-col text-sm">
                <span className="font-medium">Número</span>
                <span>{pessoa.endereco.numero}</span>
              </div>

              <div className="flex flex-col text-sm">
                <span className="font-medium">Complemento</span>
                <span>{pessoa.endereco.complemento ?? "-"}</span>
              </div>

              <div className="flex flex-col text-sm">
                <span className="font-medium">Bairro</span>
                <span>{pessoa.endereco.bairro}</span>
              </div>

              <div className="flex flex-col text-sm">
                <span className="font-medium">Cidade</span>
                <span>{pessoa.endereco.municipio.nome}</span>
              </div>

              <div className="flex flex-col text-sm">
                <span className="font-medium">Estado</span>
                <span>{pessoa.endereco.municipio.estado.uf}</span>
              </div>

              <div className="flex flex-col text-sm">
                <span className="font-medium">Telefone</span>
                <span>{pessoa.telefone}</span>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center flex items-center justify-between">
          <h2 className="text-xl font-semibold">Cadastrar perfil</h2>

          <Button asChild>
            <Link href={`/${idMunicipio}/configuracoes/pessoa/cadastrar`}>
              cadastrar
            </Link>
          </Button>
        </div>
      )}
    </>
  );
}
