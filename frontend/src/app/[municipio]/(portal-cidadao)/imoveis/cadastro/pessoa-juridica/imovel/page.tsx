import { Steps } from "../../_components/steps";
import { FormCadastroImovel } from "./_components/form";

export default function CadastroImovelPage() {
  return (
    <>
      <Steps currentStep={2} />
      <FormCadastroImovel />
    </>
  );
}
