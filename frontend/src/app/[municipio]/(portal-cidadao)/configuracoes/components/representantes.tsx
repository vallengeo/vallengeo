import Link from "next/link"

import { Avatar } from "@/components/avatar"
import { Button } from "@/components/ui/button"
import { PenSquare } from "lucide-react"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { FormRedefinirSenha } from '@/components/profile/form'

export function Representantes() {
  return (
    <div className="bg-white border border-input rounded-2xl p-6 relative">
      <div className="space-y-6">
        <div className="flex items-start justify-between flex-wrap">
          <div className="flex items-center gap-3">
            <Avatar />

            <div className="flex flex-col">
              <span className="text-3xl">Davi Luan Manuel da Cruz</span>
              <span className="text-2xl font-light">Cidadão</span>

              <div className="flex items-center gap-6">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="link" className="text-link p-0 underline hover:no-underline">
                      Redefinir senha
                    </Button>
                  </DialogTrigger>

                  <DialogContent className="max-w-[580px]">
                    <DialogHeader>
                      <DialogTitle>Redefinir a senha</DialogTitle>
                    </DialogHeader>

                    <div className="py-4 px-6 space-y-7">
                      <div className="flex items-center gap-3">
                        <Avatar />

                        <div className="flex flex-col">
                          <span className="text-3xl">Davi Luan Manuel da Cruz</span>
                          <span className="text-2xl font-light">Cidadão</span>
                        </div>
                      </div>

                      <FormRedefinirSenha />
                    </div>
                  </DialogContent>
                </Dialog>

                <Button
                  variant="link"
                  className="text-link p-0 underline hover:no-underline"
                >
                  Upload foto
                </Button>
              </div>
            </div>
          </div>

          <Link
            href="/configuracoes/editar/1"
            className="text-lg inline-flex items-center gap-2"
          >
            <PenSquare size={20} />
            Editar
          </Link>
        </div>

        <p>
          <strong className="font-medium text-xl">Representante do imóvel - Proprietário(a)</strong>
        </p>

        <div className="grid grid-cols-4 gap-x-4 gap-y-8">
          <div className="flex flex-col">
            <span className="font-medium text-sm">Nome Completo</span>
            <span>Davi Luan Manuel da Cruz</span>
          </div>

          <div className="flex flex-col">
            <span className="font-medium text-sm">CPF</span>
            <span>393.178.226-30</span>
          </div>

          <div className="flex flex-col">
            <span className="font-medium text-sm">RG</span>
            <span>30.390.965-1</span>
          </div>

          <div className="flex flex-col">
            <span className="font-medium text-sm">E-mail</span>
            <span>daviluandacruz@zf-lensysteme.com</span>
          </div>

          <div className="flex flex-col">
            <span className="font-medium text-sm">CEP</span>
            <span>25635-201</span>
          </div>

          <div className="flex flex-col">
            <span className="font-medium text-sm">Endereço</span>
            <span>Rua Alfredo Schilick</span>
          </div>

          <div className="flex flex-col">
            <span className="font-medium text-sm">Número</span>
            <span>582</span>
          </div>

          <div className="flex flex-col">
            <span className="font-medium text-sm">Complemento</span>
            <span>-</span>
          </div>

          <div className="flex flex-col">
            <span className="font-medium text-sm">Bairro</span>
            <span>Chácara Flora</span>
          </div>

          <div className="flex flex-col">
            <span className="font-medium text-sm">Cidade</span>
            <span>Petrópolis</span>
          </div>

          <div className="flex flex-col">
            <span className="font-medium text-sm">Estado</span>
            <span>Rio de janeiro</span>
          </div>

          <div className="flex flex-col">
            <span className="font-medium text-sm">Telefone</span>
            <span>(24) 2758-1193</span>
          </div>
        </div>
      </div>
    </div>
  )
}
