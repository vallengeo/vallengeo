import { Steps } from "../../_components/steps";
import { FormCadastroRepresentantes } from "./_components/form";

export default function CadastroRepresentantesPage() {
  return (
    <>
      <Steps currentStep={1} />
      <FormCadastroRepresentantes />
    </>
  );
}
