import { Metadata } from "next"
import { FormRecuperarSenha } from "./components/form";

export const metadata: Metadata = {
  title: "Recuperar senha - VallenGeo"
}

export default function RecuperarSenhaPage() {
  return (
    <div>
      <h1 className="text-[2rem]/10 font-bold mt-6">Enviamos um código para seu e-mail!</h1>
      <p className="my-6">
        Seu código de redefinição de senha expirará em <b>{'{X}'}</b> segundos.
        Por favor, forneça-o no campo abaixo para proceder com a redefinição da sua senha de usuário.
      </p>

      <FormRecuperarSenha />
    </div>
  )
}