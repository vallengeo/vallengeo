import { Logo } from "@/components/logo"
import { Metadata } from "next"
import { CadastrarComGovbr } from "./components/form"

export const metadata: Metadata = {
  title: 'Cadastrar com Gov.br - VallenGeo',
}

export default function CadastrarComEmailPage() {
  return (
    <>
      <Logo
        useBlackLogo
        className="mx-auto"
      />

      <p className="my-8 max-w-[200px] mx-auto text-center">Complete o cadastro com as informações abaixo.</p>

      <CadastrarComGovbr />
    </>
  )
}