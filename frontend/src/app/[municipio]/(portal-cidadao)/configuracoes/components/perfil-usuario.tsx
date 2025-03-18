"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Avatar } from "@/components/avatar";
import { Button } from "@/components/ui/button";
import { PenSquare } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FormRedefinirSenha } from "@/components/profile/form";
import { useState } from "react";
import { esqueciMinhaSenha, getUsuario } from "@/service/usuario";
import Cookies from "js-cookie";
import { USER_ID } from "@/constants/auth";
import { useToast } from "@/components/ui/use-toast";
import { actionLogout } from "@/service/authService";
import IPessoa from "@/interfaces/Pessoa/IPessoa";
import { Pessoas } from "./pessoas";

interface PerfilUsuarioProps {
  pessoa: IPessoa | null;
  listarPessoas: IPessoa[] | null;
}

export function PerfilUsuario({ pessoa, listarPessoas }: PerfilUsuarioProps) {
  const { toast } = useToast();

  const pathname = usePathname();
  const idMunicipio = pathname.split("/")[1];

  const [open, setOpen] = useState(false);
  const [modalConfirmation, setModalConfirmation] = useState(false);

  function handleOpenModal() {
    setModalConfirmation(true);
  }

  async function handleSolicitarRecuperacao() {
    setModalConfirmation(false);

    try {
      const userId = Cookies.get(USER_ID);

      if (!userId) {
        toast({
          title: "Erro ao redefinir senha",
          description:
            "Usuário não identificado. Faça login novamente e tente outra vez.",
          variant: "destructive",
        });

        await actionLogout();
        return;
      }

      const response = await getUsuario(userId);
      if (!response || !response.email) {
        throw new Error("Não foi possível recuperar o e-mail do usuário.");
      }

      await esqueciMinhaSenha({
        email: response.email,
        modulo: "CIDADAO",
      });

      setOpen(true);
    } catch (error: any) {
      console.error("Erro ao solicitar recuperação de senha:", error);

      toast({
        title: "Erro ao solicitar recuperação",
        description:
          error.message || "Ocorreu um problema. Tente novamente mais tarde.",
        variant: "destructive",
      });
    }
  }

  return (
    <div className="bg-white border border-input rounded-2xl p-6 relative">
      <div className="space-y-6">
        {pessoa && (
          <div className="flex items-start justify-between flex-col md:flex-row gap-6">
            <div className="flex items-center gap-3">
              <Avatar
                nome={pessoa.nome || pessoa.responsavel?.nome}
                className="text-5xl"
              />

              <div className="flex flex-col">
                <span className="text-2xl md:text-3xl">
                  {pessoa.nome || pessoa.responsavel?.nome}
                </span>
                <span className="text-xl md:text-2xl font-light">Cidadão</span>

                <div className="flex items-center gap-6">
                  <Button
                    onClick={handleOpenModal}
                    variant="link"
                    className="text-link p-0 underline hover:no-underline"
                  >
                    Redefinir senha
                  </Button>

                  <Dialog
                    open={modalConfirmation}
                    onOpenChange={setModalConfirmation}
                  >
                    <DialogContent className="max-w-[380px] max-md:h-auto rounded-3xl">
                      <DialogHeader>
                        <DialogTitle className="text-xl">
                          Confirmação
                        </DialogTitle>
                      </DialogHeader>

                      <div className="space-y-6 px-6 pb-6">
                        <p className="text-sm">
                          Tem certeza de que deseja prosseguir com a redefinição
                          da sua senha?
                        </p>

                        <div className="flex items-center justify-end gap-6">
                          <Button
                            variant={`secondary`}
                            onClick={() =>
                              setModalConfirmation(false)
                            }
                          >
                            Não
                          </Button>
                          <Button variant={`default`} onClick={handleSolicitarRecuperacao}>Sim</Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Dialog open={open} onOpenChange={setOpen}>
                    <DialogContent className="max-w-[580px]">
                      <DialogHeader>
                        <DialogTitle>Redefinir a senha</DialogTitle>
                      </DialogHeader>

                      <div className="py-4 px-6 space-y-7">
                        <div className="flex items-start gap-3">
                          <Avatar className="text-5xl" />

                          <div className="flex flex-col pt-4">
                            <span className="text-3xl">
                              {pessoa.nome || pessoa.responsavel?.nome}
                            </span>
                            <span className="text-2xl font-light">Cidadão</span>
                          </div>
                        </div>

                        <FormRedefinirSenha />
                      </div>
                    </DialogContent>
                  </Dialog>

                  {/* Fará parte da v2 */}
                  {/* <Button
                    variant="link"
                    className="text-link p-0 underline hover:no-underline"
                  >
                    Upload foto
                  </Button> */}
                </div>
              </div>
            </div>

            <Link
              href={`/${idMunicipio}/configuracoes/cadastrar/${pessoa.id}`}
              className="text-lg inline-flex items-center gap-2"
            >
              <PenSquare size={20} />
              Editar
            </Link>
          </div>
        )}

        {listarPessoas ? (
          <Pessoas listarPessoas={listarPessoas} />
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
      </div>
    </div>
  );
}
