import { Metadata } from "next"
import { FormRedefinirSenha } from "./components/form";
import { Logo } from "@/components/logo";

export const metadata: Metadata = {
  title: "Redefinir senha - VallenGeo"
}

export default function RedefinirSenhaPage() {
  return (
    <div>
      <Logo useBlackLogo />

      <h1 className="text-[2rem]/10 font-bold mt-6">Redefinir sua senha</h1>
      <p className="my-6">Informe uma senha válida para prosseguir com o a redefinição de senha.</p>

      <FormRedefinirSenha />
    </div>
  )
}