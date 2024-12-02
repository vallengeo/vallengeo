import { Metadata } from "next";
import { Steps } from "../../_components/steps";
import { FormCadastroRepresentantes } from "./_components/form";

export const metadata: Metadata = {
  title: "Representantes | VallenGeo"
}

export default function CadastroRepresentantesPage() {
  return (
    <>
      <Steps currentStep={1} />
      <FormCadastroRepresentantes />
    </>
  );
}
