import { Logo } from "@/components/logo";
import { Metadata } from "next";
import { CadastrarComEmail } from "./components/form";

export const metadata: Metadata = {
  title: "Cadastrar com E-mail - VallenGeo",
};

export default function CadastrarComEmailPage({
  params,
}: {
  params: { municipio: string };
}) {
  return (
    <>
      <Logo useBlackLogo className="mx-auto" />

      <p className="my-8 sm:max-w-[200px] mx-auto text-center">
        Complete o cadastro com as informações abaixo.
      </p>

      <CadastrarComEmail municipio={params.municipio} />
    </>
  );
}
