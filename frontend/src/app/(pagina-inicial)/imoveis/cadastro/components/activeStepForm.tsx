"use client"

import { useFormState } from "@/contexts/Imovel/FormContext";

import { CadastroRepresentantePJ } from "@/app/(pagina-inicial)/imoveis/cadastro/components/representante-pj";
import { CadastroRepresentantePF } from "@/app/(pagina-inicial)/imoveis/cadastro/components/representante-pf";
import { CadastroDocumentos } from "@/app/(pagina-inicial)/imoveis/cadastro/components/documentos";
import { CadastroImovel } from "@/app/(pagina-inicial)/imoveis/cadastro/components/imovel";
import { Steps } from "./steps";

interface IActiveStepFormComponent {
  isPJ?: boolean
}

export function ActiveStepFormComponent({ isPJ = false }: IActiveStepFormComponent) {
  const { step } = useFormState();
  let currentForm;

  switch (step) {
    case 1:
      let formRepresentante = isPJ ? <CadastroRepresentantePJ /> : <CadastroRepresentantePF />;
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