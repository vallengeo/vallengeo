"use client";

import { useEffect, useState } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import {
  Dialog,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
  DialogHeader,
  DialogClose,
  DialogTitle,
} from "@/components/ui/dialog";
import { ProfileTrigger } from "./profile-trigger";
import { MyProfile } from "./profile/my-profile";
import { X } from "lucide-react";
import { FormRedefinirSenha } from "./profile/form";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import { ACCESS_TOKEN, USER_ID } from "@/constants/auth";
import Cookies from "js-cookie";
import { actionLogout } from "@/service/authService";
import { esqueciMinhaSenha, getUsuario } from "@/service/usuario";
import { Loader } from "./loader";
import IPessoa from "@/interfaces/Pessoa/IPessoa";
import { buscarPessoaPorId } from "@/service/pessoa";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  onOverlayClick: () => void;
  className?: string;
  classNameHeader?: string;
}

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  onOverlayClick,
  className = "",
  classNameHeader = "",
}: ModalProps) => {
  if (!isOpen) return null;

  return (
    <DialogPortal>
      <DialogOverlay onClick={onOverlayClick} />
      <DialogPrimitive.Content
        className={cn(
          "fixed left-[50%] top-[50%] z-50 translate-x-[-50%] translate-y-[-50%] gap-4 border bg-white p-0 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] md:rounded-3xl h-dvh md:h-[80dvh] md:max-h-max overflow-auto w-full md:w-[calc(100%_-_2rem)] max-w-[1186px]",
          className
        )}
      >
        <DialogHeader
          className={cn(
            "py-4 px-6 lg:p-6 [&_button]:hidden",
            classNameHeader
          )}
        >
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        {children}

        <DialogClose
          onClick={onClose}
          className="absolute right-8 top-5 lg:top-7 rounded-sm ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
        >
          <span className="sr-only">Fechar</span>
          <X size={24} />
        </DialogClose>
      </DialogPrimitive.Content>
    </DialogPortal>
  );
};

export function Profile() {
  const { toast } = useToast();

  const [openModal, setOpenModal] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [pessoa, setPessoa] = useState<IPessoa | undefined>();

  const handleOpenModal = (modalName: string) => setOpenModal(modalName);
  const handleCloseModal = () => setOpenModal(null);

  async function handleSolicitarRecuperacao() {
    setLoading(true);

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

      setOpenModal("recuperarSenha");
    } catch (error: any) {
      console.error("Erro ao solicitar recuperação de senha:", error);

      toast({
        title: "Erro ao solicitar recuperação",
        description:
          error.message || "Ocorreu um problema. Tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const fetchLoadPessoa = async () => {
      try {
        // const pessoaId = Cookies.get(PESSOA_ID);
        const token = Cookies.get(ACCESS_TOKEN);
        const pessoaId = "bc517475-2c86-48b2-bd98-1e3e8626d039";

        if (!token) {
          throw new Error("Token não encontrado");
        }

        if (!pessoaId) {
          throw new Error(
            "Usuário não identificado. Faça login novamente e tente outra vez."
          );
        }

        const response = await buscarPessoaPorId(pessoaId, token);
        setPessoa(response);
      } catch (error: any) {
        console.log("Ocorreu um erro ao buscar o usuário:", error);
      }
    };

    fetchLoadPessoa();
  }, []);

  return (
    <Dialog>
      <DialogTrigger onClick={() => handleOpenModal("profile")}>
        <ProfileTrigger cargo="Analista" />
      </DialogTrigger>

      {/* Modal de Perfil */}
      <Modal
        isOpen={openModal === "profile"}
        onClose={handleCloseModal}
        title="Meu perfil"
        onOverlayClick={handleCloseModal}
        className=""
      >
        <div className="space-y-8 px-6 pt-4 pb-10">
          <MyProfile
            pessoa={pessoa}
            showAddress
            openModalChangePassword={() => handleOpenModal("confirmation")}
          />
        </div>
      </Modal>

      {/* Modal de Confirmação */}
      <Modal
        isOpen={openModal === "confirmation"}
        onClose={handleCloseModal}
        title="Confirmação"
        onOverlayClick={handleCloseModal}
        className="max-w-[380px] w-[calc(100%_-_2rem)] max-md:h-auto rounded-3xl"
        classNameHeader="text-left p-6 bg-input-secondary [&_h2]:text-xl"
      >
        <div className="space-y-6 px-6 pb-6">
          <p className="text-sm">
            Tem certeza de que deseja prosseguir com a redefinição da sua senha?
          </p>

          <div className="flex items-center justify-end gap-6">
            <Button variant={`secondary`} onClick={handleCloseModal}>
              Não
            </Button>
            <Button
              variant={`default`}
              onClick={handleSolicitarRecuperacao}
              className={`h-10 w-28 ${loading ? "pointer-events-none" : ""}`}
            >
              {loading ? <Loader /> : "Sim"}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Modal de Redefinição de senha */}
      <Modal
        isOpen={openModal === "recuperarSenha"}
        onClose={handleCloseModal}
        title="Redefinir a senha"
        onOverlayClick={handleCloseModal}
        className="max-w-[580px]"
      >
        <div className="p-6 space-y-7">
          <MyProfile pessoa={pessoa} />
          <FormRedefinirSenha />
        </div>
      </Modal>
    </Dialog>
  );
}
