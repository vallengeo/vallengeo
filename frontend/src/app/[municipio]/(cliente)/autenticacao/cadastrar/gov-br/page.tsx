import { Logo } from "@/components/logo"
import { Metadata } from "next"
import { CadastrarComGovbr } from "./components/form"

export const metadata: Metadata = {
  title: 'Cadastrar com Gov.br - VallenGeo',
}

export default function CadastrarComGovBRPage({
  params,
}: {
  params: { municipio: string }
}) {
  return (
    <>
      <Logo
        useBlackLogo
        className="mx-auto"
      />

      <p className="my-8 sm:max-w-[200px] mx-auto text-center">
        Complete o cadastro com as informações abaixo.
      </p>

      <CadastrarComGovbr municipio={params.municipio} />
    </>
  )
}