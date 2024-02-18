import type { Metadata } from 'next'
import { FormEsqueciMinhaSenha } from "./components/form";

export const metadata: Metadata = {
  title: 'Esqueceu a senha - VallenGeo',
}

export default function EsqueciMinhaSenhaPage() {
  return (
    <div>
      <h1 className="text-[2rem] mt-6">Esqueceu sua senha?</h1>
      <p className="py-6">Informe seu e-mail de cadastro para enviarmos o código de validação.</p>

      <FormEsqueciMinhaSenha />
    </div>
  )
}