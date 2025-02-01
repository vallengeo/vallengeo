import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Acesse a plataforma | VallenGeo",
};

export default function AutenticacaoPage({
  params,
}: {
  params: { municipio: string };
}) {
  return (
    <div>
      <Logo useBlackLogo className="mx-auto" />

      <div className="mt-8 text-center">
        <p>
          Acesse a plataforma de regularização de imóveis através dos campos
          abaixo.
        </p>

        <div className="flex flex-col gap-y-6 w-72 mx-auto mt-10">
          {/* <Button variant="gov-br" className="h-12">
            Entrar com&nbsp;<span className="font-bold">gov.br</span>
          </Button> */}

          <Button asChild className="h-12">
            <Link href={`/${params.municipio}/autenticacao/login`}>
              Acessar
            </Link>
          </Button>

          <Button asChild variant="tertiary" className="h-12">
            <Link href={`/${params.municipio}`}>Acessar sem login</Link>
          </Button>

          <Button asChild variant="secondary" className="h-12 font-medium">
            <Link href={`/${params.municipio}/autenticacao/cadastrar/email`}>
              Cadastrar
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
