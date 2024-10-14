"use client"

import { useFormState } from "@/contexts/Imovel/FormContext";
import { CadastroRepresentantePJ } from "./cadastro-representante-pj";
import { CadastroRepresentantePF } from "./cadastro-representante-pf";
import { CadastroDocumentos } from "./step-documentos";
import { CadastroImovel } from "./step-imovel";
import { Steps } from "./steps";

interface CurrentStepFormProps {
  isPJ?: boolean
}

export function CurrentStepForm({ isPJ = false }: CurrentStepFormProps) {
  const { step } = useFormState();
  let currentForm;

  switch (step) {
    case 2:
      let formRepresentante = isPJ ? <CadastroRepresentantePJ/> : <CadastroRepresentantePF/>;
      currentForm = formRepresentante;
      break;
    case 1:
      currentForm = <CadastroImovel />;
      break;
    case 3:
      currentForm = <CadastroDocumentos />;
      break;
    default:
      return null;
  }

  return (
    <>
      <Steps currentStep={step} />
      {currentForm}
    </>
  )
}