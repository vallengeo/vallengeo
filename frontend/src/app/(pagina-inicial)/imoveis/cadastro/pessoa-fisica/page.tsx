'use client'

import { Metadata } from "next";
import Link from "next/link";

import Header from "@/app/(pagina-inicial)/components/header";
import Steps from "../../components/cadastro/steps";

import { FormRepresentante } from "@/contexts/Imovel/FormRepresentante";
import { FormDocumentos } from "@/contexts/Imovel/FormDocumentos";
import { FormImovel } from "@/contexts/Imovel/FormImovel";
import { useFormState } from "@/contexts/Imovel/FormContext";

export const metada: Metadata = {
  title: 'Cadastro de imóvel',
}

function ActiveStepFormComponent() {
  const { step } = useFormState();

  switch (step) {
    case 1:
      return <FormRepresentante />;
    case 2:
      return <FormDocumentos />;
    case 3:
      return <FormImovel />;
    default:
      return null;
  }
}

export default function CadastroImoveisPF() {
  const { step } = useFormState();

  return (
    <>
      <Header
        title="Cadastro de imóvel"
        linkBack="/imoveis"
      >
        <div className="flex items-center gap-1">
          <Link href="/imoveis" className="font-medium">Imóveis</Link>
          <span>/</span>
          <strong>Novo cadastro</strong>
        </div>
      </Header>

      <main className="space-y-6 mt-6 mb-4">
        <Steps currentStep={step} />
        <ActiveStepFormComponent />
      </main>
    </>
  )
}
