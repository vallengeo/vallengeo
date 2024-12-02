import { Metadata } from "next";
import { Steps } from "../../_components/steps";
import { FormCadastroImovel } from "./_components/form";

export const metadata: Metadata = {
  title: "Imóvel | VallenGeo"
}

export default function CadastroImovelPage() {
  return (
    <>
      <Steps currentStep={2} />
      <FormCadastroImovel />
    </>
  );
}
