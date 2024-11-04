import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: 'Cadastrar com E-mail - VallenGeo',
}

export default function CadastroPage({
  params,
}: {
  params: { municipio: string }
}) {
  return (
    <div>
      <Logo useBlackLogo className="mx-auto" />

      <div className="mt-8 text-center">
        <p>Acesse a plataforma de regularização de imóveis através dos campos abaixo.</p>

        <div className="flex flex-col gap-y-6 w-72 mx-auto mt-10">
          <Button asChild variant="gov-br" className="h-12">
            <Link href={`/${params.municipio}/autenticacao/cadastrar/gov-br`}>
              Cadastrar com&nbsp;<span className="font-bold">gov.br</span>
            </Link>
          </Button>

          <Button asChild className="h-12">
            <Link href={`/${params.municipio}/autenticacao/cadastrar/email`}>
              Cadastrar com E-mail
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}