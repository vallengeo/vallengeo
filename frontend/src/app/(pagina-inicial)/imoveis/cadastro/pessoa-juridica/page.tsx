'use client'

import { Metadata } from "next";
import Link from "next/link";

import Header from "@/app/(pagina-inicial)/components/header";
import Steps from "../components/steps";

import { CadastroRepresentantePJ } from "@/app/(pagina-inicial)/imoveis/cadastro/components/representante-pf";
import { CadastroDocumentos } from "@/app/(pagina-inicial)/imoveis/cadastro/components/documentos";
import { CadastroImovel } from "@/app/(pagina-inicial)/imoveis/cadastro/components/imovel";
import { useFormState } from "@/contexts/Imovel/FormContext";

export const metada: Metadata = {
  title: 'Cadastro de imóvel',
}

function ActiveStepFormComponent() {
  const { step } = useFormState();

  switch (step) {
    case 1:
      return <CadastroRepresentantePJ />;
    case 2:
      return <CadastroDocumentos />;
    case 3:
      return <CadastroImovel />;
    default:
      return null;
  }
}

export default function CadastroImoveisPJ() {
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
