import Link from "next/link";

import { Button } from "@/components/ui/button";

import {
  Building,
  User
} from "lucide-react";

export default function CadastroTipoPessoa() {
  return (
    <div className="flex gap-6 h-fit max-md:flex-col md:px-10">
      <div className="flex-1 flex items-start gap-6 border border-[#E8E1E1] rounded-2xl py-9 px-7">
        <Building size={40} className="flex-[0_0_auto] mt-4" />

        <div className="flex-1 flex flex-col gap-8">
          <h3 className="max-md:text-xl">Cadastrar imóvel de<br/> Pessoa jurídica</h3>

          <Link href="/imoveis/cadastro/pessoa-juridica" className="self-end">
            <Button variant="default">
              Acessar
            </Button>
          </Link>
        </div>
      </div>

      <div className="flex-1 flex items-start gap-6 border border-[#E8E1E1] rounded-2xl py-9 px-7">
        <User size={40} className="flex-[0_0_auto] mt-4" />

        <div className="flex-1 flex flex-col gap-8">
          <h3 className="max-md:text-xl">Cadastrar imóvel de<br/> Pessoa Física</h3>

          <Link href="/imoveis/cadastro/pessoa-fisica" className="self-end">
            <Button variant="default">
              Acessar
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}