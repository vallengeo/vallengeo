'use client'

import { FormProvider } from "@/contexts/Imovel/FormContext"

export default function CadastroImovelLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <FormProvider>{children}</FormProvider>
  )
}
