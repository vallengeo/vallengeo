'use client'

import { Button } from "@/components/ui/button";
import { useFormState } from "../../../../../contexts/Imovel/FormContext";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Check } from "lucide-react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, SubmitHandler } from "react-hook-form";

const representanteFormSchema = z.object({

})

type representanteFormData = z.infer<typeof representanteFormSchema>

export function CadastroRepresentantePJ() {
  const { onHandleNext } = useFormState();

  const { register, handleSubmit, formState: { errors } } = useForm<representanteFormData>({
    resolver: zodResolver(representanteFormSchema)
  });

  const onHandleSubmit: SubmitHandler<representanteFormData> = (data) => {
    console.log(data);
    onHandleNext()
  }

  return (
    <form onSubmit={handleSubmit(onHandleSubmit)}>
      <div className="bg-white border border-[#E8E1E1] rounded-2xl p-6">
        <header className="flex items-center justify-between mb-1">
          <h2 className="text-xl">Representante do imóvel</h2>
          <span className="max-md:hidden">*itens obrigatórios</span>
        </header>

        <p>Informe todos os dados para iniciar o processo de cadastramento de imóvel.</p>

        <div className="mt-6">
          <fieldset>
            <legend className="sr-only">Dados pessoais</legend>

            <div className="space-y-6">
              <div className="flex items-start gap-6">
                <div className="w-3/5">
                  <Label htmlFor="razao-social">Razão Social da empresa*</Label>
                  <Input
                    id="razao-social"
                    type="text"
                    className="max-w-none"
                  />
                </div>

                <div className="w-1/4">
                  <Label htmlFor="cnpj">CNPJ*</Label>
                  <Input
                    type="text"
                    name="cnpj"
                    id="cnpj"
                    maxLength={18}
                  />
                </div>

                <div className="w-1/5">
                  <Label htmlFor="telefone">Telefone*</Label>
                  <Input type="tel" name="telefone" id="telefone" maxLength={11} />
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-[35%]">
                  <Label htmlFor="email">E-mail*</Label>
                  <Input type="email" name="email" id="email" />
                </div>

                <div className="w-1/5">
                  <Label htmlFor="cep">CEP*</Label>
                  <Input
                    type="text"
                    name="cep"
                    id="cep"
                    maxLength={8}
                  />
                </div>

                <div className="w-[45%]">
                  <Label htmlFor="endereco">Endereço*</Label>
                  <Input
                    type="text"
                    name="endereco"
                    id="endereco"
                    className="max-w-none"
                  />
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-1/5">
                  <Label htmlFor="numero">Número*</Label>
                  <Input type="number" name="numero" id="numero" />
                </div>

                <div className="w-1/5">
                  <Label htmlFor="complemento">Complemento*</Label>
                  <Input
                    type="text"
                    name="complemento"
                    id="complemento"
                  />
                </div>

                <div className="w-1/5">
                  <Label htmlFor="bairro">Bairro*</Label>
                  <Input
                    type="text"
                    name="bairro"
                    id="bairro"
                  />
                </div>

                <div className="w-1/5">
                  <Label htmlFor="cidade">Cidade*</Label>
                  <Input
                    type="text"
                    name="cidade"
                    id="cidade"
                  />
                </div>

                <div className="w-1/5">
                  <Label>UF*</Label>
                </div>
              </div>
            </div>
          </fieldset>

          <fieldset className="border-t border-t-[#C3C3C3] pt-6 mt-6">
            <legend className="sr-only m-0">Dados representante</legend>

            <div className="space-y-6">
              <div className="flex items-start gap-6">
                <div className="w-[35%]">
                  <Label htmlFor="representante-empresa">Nome completo representante da empresa*</Label>
                  <Input type="text" name="representante_empresa" id="representante-empresa" />
                </div>

                <div className="w-1/5">
                  <Label htmlFor="representante-cpf">CPF*</Label>
                  <Input
                    id="representante-cpf"
                    type="text"
                    name="representante_cpf"
                    maxLength={14}
                  />
                </div>

                <div className="w-1/5">
                  <Label htmlFor="representante-rg">RG*</Label>
                  <Input type="text" name="representante_rg" id="representante-rg" maxLength={10} />
                </div>

                <div className="w-1/4">
                  <Label htmlFor="representante-telefone">Telefone*</Label>
                  <Input type="tel" name="representante_telefone" id="representante-telefone" maxLength={11} />
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-[35%]">
                  <Label htmlFor="email-pj">E-mail*</Label>
                  <Input type="email" name="email_pj" id="email-pj" />
                </div>

                <div className="w-1/5">
                  <Label htmlFor="cep-pj">CEP*</Label>
                  <Input
                    type="text"
                    name="cep_pj"
                    id="cep-pj"
                    maxLength={8}
                  />
                </div>

                <div className="w-[45%]">
                  <Label htmlFor="endereco-pj">Endereço*</Label>
                  <Input type="text" name="endereco_pj" id="endereco-pj" className="max-w-none" />
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="1/5">
                  <Label htmlFor="numero-pj">Número*</Label>
                  <Input type="number" name="numero_pj" id="numero-pj" />
                </div>

                <div className="1/5">
                  <Label htmlFor="complemento-pj">Complemento*</Label>
                  <Input type="text" name="complemento_pj" id="complemento-pj" />
                </div>

                <div className="1/5">
                  <Label htmlFor="bairro-pj">Bairro*</Label>
                  <Input type="text" name="bairro_pj" id="bairro-pj" />
                </div>

                <div className="1/5">
                  <Label htmlFor="cidade-pj">Cidade*</Label>
                  <Input type="text" name="cidade_pj" id="cidade-pj" />
                </div>

                <div className="1/5">
                  <Label htmlFor="uf-pj">UF*</Label>
                  <Input type="text" name="uf_pj" id="uf-pj" maxLength={2} />
                </div>
              </div>
            </div>
          </fieldset>
        </div>

        <fieldset className="space-y-6">
          <legend className="sr-only">Informação de contato</legend>

          <header className="flex items-center gap-4">
            <h2 className="text-xl">Informação de contato:</h2>

            <div>
              <Label className="flex items-center gap-1 cursor-pointer">
                <Input
                  type="radio"
                  name="contato"
                  className="w-4 h-4 sr-only [&:checked_+_span_svg]:opacity-100 [&:checked_+_span_svg]:visible"
                  defaultChecked
                />
                <span className="inline-flex w-4 h-4 border-2 border-primary-foreground relative">
                  <Check
                    size={12}
                    strokeWidth={3}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 invisible peer-checked:opacity-100 peer-checked:visible"
                  />
                </span>
                outro contato
              </Label>
            </div>
            <div>
              <Label className="flex items-center gap-1 cursor-pointer">
                <Input
                  type="radio"
                  name="contato"
                  className="w-4 h-4 sr-only [&:checked_+_span_svg]:opacity-100 [&:checked_+_span_svg]:visible"
                />
                <span className="inline-flex w-4 h-4 border-2 border-primary-foreground relative">
                  <Check
                    size={12}
                    strokeWidth={3}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 invisible peer-checked:opacity-100 peer-checked:visible"
                  />
                </span>
                o representante do imóvel
              </Label>
            </div>
          </header>

          <div className="flex items-start gap-6">
            <div className="w-[35%]">
              <Label htmlFor="nome-contato">Nome completo*</Label>
              <Input type="text" name="nome_contato" id="nome-contato" />
            </div>

            <div className="w-1/4">
              <Label htmlFor="telefone-contato">Telefone*</Label>
              <Input type="tel" name="telefone_contato" id="telefone-contato" maxLength={11} />
            </div>
          </div>
        </fieldset>
      </div>

      <div className="flex justify-end mt-6">
        <Button type="submit">Avançar</Button>
      </div>
    </form>
  )
}