"use client"

import { useFormState } from "@/contexts/Imovel/FormContext";

import { CadastroRepresentantePJ } from "./representante-pj";
import { CadastroRepresentantePF } from "./representante-pf";
import { CadastroDocumentos } from "./documentos";
import { CadastroImovel } from "./imovel";
import { Steps } from "./steps";

interface ActiveStepFormComponentProps {
  isPJ?: boolean
}

export function ActiveStepFormComponent({ isPJ = false }: ActiveStepFormComponentProps) {
  const { step } = useFormState();
  let currentForm;

  switch (step) {
    case 1:
      let formRepresentante = isPJ ? <CadastroRepresentantePJ/> : <CadastroRepresentantePF/>;
      currentForm = formRepresentante;
      break;
    case 2:
      currentForm = <CadastroDocumentos />;
      break;
    case 3:
      currentForm = <CadastroImovel />;
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