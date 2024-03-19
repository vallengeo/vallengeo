'use client'

import { useState } from 'react'

import * as DialogPrimitive from "@radix-ui/react-dialog"

import {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogHeader,
  DialogClose,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ProfileTrigger } from './profile-trigger'
import { MyProfile } from './profile/my-profile'

import { X } from 'lucide-react'
import { FormRedefinirSenha } from './profile/form'

export function Profile() {
  const [openModalMyProfile, setOpenModalMyProfile] = useState(false)
  const [openModalChangePassword, setOpenModalChangePassword] = useState(false)

  function handleOpenModalMyProfile() {
    setOpenModalMyProfile(true)
  }

  function handleCloseModalMyProfile() {
    setOpenModalMyProfile(false)
  }

  function handleOpenModalChangePassword() {
    handleCloseModalMyProfile()
    setOpenModalChangePassword(true)
  }

  function handleCloseModalChangePassword() {
    setOpenModalChangePassword(false)
  }

  return (
    <Dialog>
      <DialogTrigger onClick={handleOpenModalMyProfile}>
        <ProfileTrigger />
      </DialogTrigger>

      {openModalMyProfile && (
        <DialogPortal>
          <DialogOverlay onClick={handleCloseModalMyProfile} />

          <DialogPrimitive.Content className="fixed left-[50%] top-[50%] z-50 grid grid-rows-[max-content_minmax(0,1fr)] w-full translate-x-[-50%] translate-y-[-50%] gap-4 border bg-white p-0 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-3xl max-md:h-full overflow-auto max-w-[1186px]">
            <DialogHeader className="p-6 bg-background">
              <DialogTitle className="text-[2rem]">Meu perfil</DialogTitle>
            </DialogHeader>

            <div className="mt-4 space-y-8 px-6 pt-4 pb-10">
              <MyProfile
                showAddress
                openModalChangePassword={handleOpenModalChangePassword}
              />
            </div>

            <DialogClose
              className="absolute right-8 top-9 rounded-sm ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
            >
              <span className="sr-only">Fechar</span>
              <X size={24} />
            </DialogClose>
          </DialogPrimitive.Content>
        </DialogPortal>
      )}

      {openModalChangePassword && (
        <DialogPortal>
          <DialogOverlay onClick={handleCloseModalChangePassword} />

          <DialogPrimitive.Content className="fixed left-[50%] top-[50%] z-50 grid grid-rows-[max-content_minmax(0,1fr)] w-full translate-x-[-50%] translate-y-[-50%] gap-4 border bg-white p-0 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-3xl max-md:h-full overflow-auto max-w-[580px]">
            <DialogHeader className="p-6 bg-background">
              <DialogTitle className="text-[2rem]">Redefinir a senha</DialogTitle>
            </DialogHeader>

            <div className="mt-4 space-y-8 px-6 pt-4 pb-10">
              <MyProfile />

              <FormRedefinirSenha />
            </div>

            <DialogClose
              onClick={handleCloseModalChangePassword}
              className="absolute right-8 top-9 rounded-sm ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
            >
              <span className="sr-only">Fechar</span>
              <X size={24} />
            </DialogClose>
          </DialogPrimitive.Content>
        </DialogPortal>
      )}
    </Dialog>
  );
}