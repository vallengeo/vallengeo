'use client'

import { Button } from "@/components/ui/button";
import { useFormState } from "./FormContext";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Estados from "@/components/form/estados";

import { useState } from "react";
import { getCep } from "@/lib/utils";

export function FormImovel() {
  const { onHandleBack } = useFormState();

  const [dataEndereco, setDataEndereco] = useState({
    logradouro: '',
    complemento: '',
    bairro: '',
    localidade: '',
  })

  const handleCepChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const newCep = event.target.value

    if (newCep.length < 8) return

    const data = await getCep(newCep)

    setDataEndereco({
      logradouro: data.logradouro,
      complemento: data.complemento,
      bairro: data.bairro,
      localidade: data.localidade,
    })
  };

  return (
    <form className="space-y-6">
      <fieldset className="bg-white border border-[#E8E1E1] rounded-2xl p-6">
        <legend className="sr-only">Informações do imóvel</legend>

        <header className="flex items-center justify-between mb-1">
          <h2 className="text-xl">Informações do imóvel</h2>
          <span>*itens obrigatórios</span>
        </header>

        <p>Informe todos os dados para continuar o processo de cadastramento de imóvel.</p>

        <div className="space-y-6 mt-6">
          <div className="flex items-center gap-6">
            <div className="w-[35%]">
              <Label>Tipo de grupo ou ocupação/uso*</Label>
              <Select name="tipo-grupo">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="teste">Teste</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="w-[35%]">
              <Label>Tipo de divisão*</Label>
              <Select name="tipo-divisao">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="teste">Teste</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="w-[30%]">
              <Label htmlFor="cep">CEP*</Label>
              <Input
                id="cep"
                name="cep"
                onChange={handleCepChange}
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="w-2/5">
              <Label htmlFor="endereco">Endereço*</Label>
              <Input
                type="text"
                name="endereco"
                id="endereco"
                value={dataEndereco.logradouro}
                className="max-w-none"
              />
            </div>

            <div className="w-[30%]">
              <Label htmlFor="numero">Número*</Label>
              <Input type="number" name="numero" id="numero" />
            </div>

            <div className="w-[30%]">
              <Label htmlFor="complemento">Complemento*</Label>
              <Input type="text" name="complemento" id="complemento" value={dataEndereco.complemento} />
            </div>
          </div>

          <div className="flex items-center gap-6">
              <div className="w-2/5">
                <Label htmlFor="bairro">Bairro*</Label>
                <Input type="text" name="bairro" id="bairro" value={dataEndereco.bairro} />
              </div>

              <div className="w-3/5">
                <Label htmlFor="cidade">Cidade*</Label>
                <Input
                  type="text"
                  name="cidade"
                  id="cidade"
                  value={dataEndereco.localidade}
                  className="max-w-none"
                />
              </div>

              <div className="w-2/5">
                <Label htmlFor="uf">UF*</Label>
                <Estados />
              </div>
          </div>
        </div>
      </fieldset>

      <fieldset className="bg-white border border-[#E8E1E1] rounded-2xl p-6">
        <legend className="sr-only">Caracterização do imóvel</legend>

        <header className="flex items-center justify-between mb-1">
          <h2 className="text-xl">Caracterização do imóvel</h2>
          <span>*itens obrigatórios</span>
        </header>

        <p>Informe todos os dados para continuar o processo de cadastramento de imóvel.</p>
      </fieldset>

      <fieldset className="bg-white border border-[#E8E1E1] rounded-2xl p-6">
        <legend className="sr-only">Georeferenciamento</legend>

        <header className="flex items-center justify-between mb-1">
          <h2 className="text-xl">Georeferenciamento</h2>
        </header>
      </fieldset>

      <fieldset className="bg-white border border-[#E8E1E1] rounded-2xl p-6">
        <legend className="sr-only">Observações</legend>

        <header className="flex items-center justify-between mb-1">
          <h2 className="text-xl">Observações</h2>
        </header>

        <Textarea rows={8} className="mt-6" />
      </fieldset>

      <div className="flex justify-end gap-4">
        <Button variant="secondary" onClick={onHandleBack}>Voltar</Button>
        <Button>Finalizar</Button>
      </div>
    </form>
  )
}
