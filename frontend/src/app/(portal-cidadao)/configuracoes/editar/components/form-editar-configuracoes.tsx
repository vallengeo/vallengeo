import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { mapearEstados } from "@/validation/estados"

export function FormEditarConfiguracoes() {
  const ufOptions = Object.entries(mapearEstados).map(([value, label]) => (
    <SelectItem value={value} key={value}>
      {label}
    </SelectItem>
  ))

  return (
    <form className="space-y-6">
      <fieldset className="bg-white border border-input rounded-2xl">
        <div className="p-6">
          <h2 className="text-xl font-medium">Representante do imóvel - Proprietário(a)</h2>
          <p>Informe todos os dados para iniciar o processo de cadastramento de imóvel.</p>

          <div className="mt-6 space-y-6">
            <div className="flex items-start gap-6 max-md:flex-col">
              <div className="w-full md:w-[35%]">
                <Label htmlFor="nome">Nome completo*</Label>
                <Input id="nome" type="text" name="nome" value="Davi Luan Manuel da Cruz" />
              </div>

              <div className="w-full md:w-1/5">
                <Label htmlFor="cpf">CPF*</Label>
                <Input id="cpf" type="tel" name="cpf" value="393.178.226-30" />
              </div>

              <div className="w-full md:w-1/5">
                <Label htmlFor="rg">RG*</Label>
                <Input id="rg" type="tel" name="rg" value="30.390.965-1" />
              </div>

              <div className="w-full md:w-1/4">
                <Label htmlFor="telefone">Telefone*</Label>
                <Input id="telefone" type="tel" name="telefone" value="(24) 2758-1193" />
              </div>
            </div>

            <div className="flex items-start gap-6 max-md:flex-col">
              <div className="w-full md:w-[35%]">
                <Label htmlFor="email">E-mail*</Label>
                <Input id="email" type="email" name="email" value="daviluandacruz@zf-lensysteme.com" />
              </div>

              <div className="w-full md:w-1/5">
                <Label htmlFor="cep">CEP*</Label>
                <Input id="cep" type="tel" name="cep" value="25635-201" />
              </div>

              <div className="w-full md:w-[45%]">
                <Label htmlFor="endereco">Endereço*</Label>
                <Input id="endereco" type="text" name="endereco" value="Rua Alfredo Schilick" />
              </div>
            </div>

            <div className="flex items-start gap-6 max-md:flex-col">
              <div className="w-full md:w-1/4">
                <Label htmlFor="numero">Número*</Label>
                <Input id="numero" type="tel" name="numero" value="582" />
              </div>

              <div className="w-full md:w-1/5">
                <Label htmlFor="complemento">Complemento*</Label>
                <Input id="complemento" type="text" name="complemento" value="-" />
              </div>

              <div className="w-full md:w-1/5">
                <Label htmlFor="bairro">Bairro*</Label>
                <Input id="bairro" type="text" name="bairro" value="Chácara Flora" />
              </div>

              <div className="w-full md:w-1/5">
                <Label htmlFor="cidade">Cidade*</Label>
                <Input id="cidade" type="text" name="cidade" value="Petrópolis" />
              </div>

              <div className="w-full md:w-1/5">
                <Label htmlFor="uf">UF*</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Rio de Janeiro" />
                  </SelectTrigger>
                  <SelectContent>
                    {ufOptions}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full h-px bg-input" />

        <div className="p-6 flex items-center justify-between flex-wrap">
          <h2 className="text-xl font-medium">Deseja vincular um novo representante ao imóvel?</h2>

          <div className="flex items-center gap-6">
            <Button variant="secondary">Limpar</Button>
            <Button>Acessar</Button>
          </div>
        </div>
      </fieldset>

      <fieldset className="bg-white border border-input rounded-2xl p-6 space-y-6">
        <h2 className="text-xl font-medium">Informação de contato:</h2>

        <div className="flex items-start gap-6 max-md:flex-col">
          <div className="w-full md:w-1/4">
            <Label htmlFor="nome-contato">Nome completo*</Label>
            <Input id="nome-contato" type="text" name="nome_contato" value="Davi Luan Manuel da Cruz" />
          </div>

          <div className="w-full md:w-1/4">
            <Label htmlFor="email-contato">E-mail*</Label>
            <Input id="email-contato" type="text" name="email_contato" value="daviluandacruz@..." />
          </div>

          <div className="w-full md:w-1/4">
            <Label htmlFor="telefone-contato">Telefone*</Label>
            <Input id="telefone-contato" type="text" name="telefone_contato" value="(24) 2758-1193" />
          </div>

          <div className="w-full md:w-1/4">
            <Label htmlFor="cpnj-contato">CPNJ*</Label>
            <Input id="cpnj-contato" type="text" name="cpnj_contato" value="42.023.123/010001-60" />
          </div>

          <div className="w-full md:w-1/4">
            <Label htmlFor="cpf-contato">CPF*</Label>
            <Input id="cpf-contato" type="text" name="cpf_contato" value="119.220.336-22" />
          </div>
        </div>
      </fieldset>

      <div className="flex items-center justify-end">
        <Button>Salvar</Button>
      </div>
    </form>
  )
}