"use client";

import { useState } from "react";
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

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  onOverlayClick: () => void;
  className?: string;
}

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  onOverlayClick,
  className = "",
}: ModalProps) => {
  if (!isOpen) return null;

  return (
    <DialogPortal>
      <DialogOverlay onClick={onOverlayClick} />
      <DialogPrimitive.Content
        className={cn(
          "fixed left-[50%] top-[50%] z-50 w-full translate-x-[-50%] translate-y-[-50%] gap-4 border bg-white p-0 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] md:rounded-3xl max-md:h-full overflow-auto max-w-[1186px]",
          className
        )}
      >
        <DialogHeader className="p-4 lg:p-6 bg-background  [&_button]:hidden">
          <DialogTitle className="text-2xl lg:text-[2rem]">{title}</DialogTitle>
        </DialogHeader>

        <div className="mt-4 space-y-8 px-6 pt-4 pb-10">{children}</div>

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
  const [openModal, setOpenModal] = useState<string | null>(null);

  const handleOpenModal = (modalName: string) => setOpenModal(modalName);

  const handleCloseModal = () => setOpenModal(null);

  return (
    <Dialog>
      <DialogTrigger onClick={() => handleOpenModal("profile")}>
        <ProfileTrigger />
      </DialogTrigger>

      {/* Modal de Perfil */}
      <Modal
        isOpen={openModal === "profile"}
        onClose={handleCloseModal}
        title="Meu perfil"
        onOverlayClick={handleCloseModal}
      >
        <MyProfile
          showAddress
          openModalChangePassword={() => handleOpenModal("changePassword")}
        />
      </Modal>

      {/* Modal de Redefinir Senha */}
      <Modal
        isOpen={openModal === "changePassword"}
        onClose={handleCloseModal}
        title="Redefinir a senha"
        onOverlayClick={handleCloseModal}
        className="md:max-w-[580px]"
      >
        <MyProfile />
        <FormRedefinirSenha />
      </Modal>
    </Dialog>
  );
}
