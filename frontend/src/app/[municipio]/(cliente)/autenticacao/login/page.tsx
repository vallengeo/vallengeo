import { Logo } from "@/components/logo";
import { FormLogin } from "./components/form";

export default function LoginPage({
  params,
}: {
  params: { municipio: string };
}) {
  return (
    <div>
      <Logo useBlackLogo />

      <p className="mt-8 mb-6">
        Acesse a plataforma de regularização de imóveis através dos campos
        abaixo.
      </p>

      <FormLogin municipio={params.municipio} />
    </div>
  );
}
