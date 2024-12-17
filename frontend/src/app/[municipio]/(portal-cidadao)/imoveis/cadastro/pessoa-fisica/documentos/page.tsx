import { Metadata } from "next";
import { Steps } from "../../_components/steps";
import { FormCadastroDocumentos } from "./_components/form";

export const metadata: Metadata = {
  title: "Documentos | VallenGeo"
}

export default function CadastroDocumentosPage() {
  return (
    <>
      <Steps currentStep={3} />
      <FormCadastroDocumentos />
    </>
  );
}
