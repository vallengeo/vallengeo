import { Steps } from "../../_components/steps";
import { FormCadastroDocumentos } from "./_components/form";

export default function CadastroDocumentosPage() {
  return (
    <>
      <Steps currentStep={3} />
      <FormCadastroDocumentos />
    </>
  );
}
