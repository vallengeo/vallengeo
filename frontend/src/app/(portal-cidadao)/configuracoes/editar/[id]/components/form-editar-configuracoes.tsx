'use client'

import { mapearEstados } from "@/validation/estados"
import { dadosPessoaisSchema, dadosPessoaisData } from "@/validation/imovel/representante"
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formatarCampo, consultarCep } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from "@/components/ui/form";

import { useToast } from "@/components/ui/use-toast"

export function FormEditarConfiguracoes() {
  const { toast } = useToast()

  const form = useForm<dadosPessoaisData>({
    resolver: zodResolver(dadosPessoaisSchema),
    defaultValues: {
      nome: "Davi Luan Manuel da Cruz",
      cpf: "393.178.226-30",
      rg: "30.390.965-1",
      email: "daviluandacruz@zf-lensysteme.com",
      cep: "25635-201",
      endereco: "Rua Alfredo Schilick",
      numero: "582",
      complemento: "-",
      bairro: "Chácara Flora",
      cidade: "Petrópolis",
      uf: "RJ",
      telefone: "(24) 2758-1193"
    }
  })

  const onSubmit: SubmitHandler<dadosPessoaisData> = (data) => {
    toast({
      description: 'Dados enviados com sucesso!',
    })

    console.log(data)
  }

  const ufOptions = Object.entries(mapearEstados).map(([value, label]) => (
    <SelectItem value={value} key={value}>
      {label}
    </SelectItem>
  ))

  const handleChangeCEP = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value
    const formattedValue = formatarCampo(rawValue, 'CEP')
    form.setValue('cep', formattedValue)

    if (formattedValue.length === 9) {
      try {
        const response = await consultarCep(formattedValue)

        if (response.erro) {
          toast({
            description: 'CEP não encontrado!',
            variant: "destructive",
          })
          return;
        }

        form.setValue('endereco', response.logradouro)
        form.setValue('complemento', response.complemento)
        form.setValue('bairro', response.bairro)
        form.setValue('cidade', response.localidade)
        form.setValue('uf', response.uf)
      } catch (error) {
        console.error('Erro ao consultar CEP:', error)
      }
    }
  }

  function handleChangeCPF(e: React.ChangeEvent<HTMLInputElement>): void {
    const rawValue = e.target.value;
    const formattedValue = formatarCampo(rawValue, 'CPF')

    form.setValue('cpf', formattedValue)
  }

  function handleChangeRG(e: React.ChangeEvent<HTMLInputElement>): void {
    const rawValue = e.target.value
    const formattedValue = formatarCampo(rawValue, 'RG')

    form.setValue('rg', formattedValue)
  }

  function handleChangeTelefone(e: React.ChangeEvent<HTMLInputElement>): void {
    const rawValue = e.target.value;
    const formattedValue = formatarCampo(rawValue, 'Telefone');
    form.setValue('telefone', formattedValue);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <fieldset className="bg-white border border-input rounded-2xl">
          <div className="p-6">
            <h2 className="text-xl font-medium">Representante do imóvel - Proprietário(a)</h2>
            <p>Informe todos os dados para iniciar o processo de cadastramento de imóvel.</p>

            <div className="mt-6 space-y-6">
              <div className="flex items-start gap-6 max-md:flex-col">
                <FormField
                  control={form.control}
                  name="nome"
                  render={({ field }) => (
                    <FormItem className="w-full md:w-[35%]">
                      <FormLabel>Nome completo*</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          {...field}
                          value={form.getValues('nome')}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="cpf"
                  render={({ field }) => (
                    <FormItem className="w-full md:w-[35%]">
                      <FormLabel>CPF*</FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          {...field}
                          value={form.getValues('cpf')}
                          maxLength={14}
                          onChange={handleChangeCPF}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="rg"
                  render={({ field }) => (
                    <FormItem className="w-full md:w-1/5">
                      <FormLabel>RG*</FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          {...field}
                          value={form.getValues('rg')}
                          maxLength={10}
                          onChange={handleChangeRG}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="telefone"
                  render={({ field }) => (
                    <FormItem className="w-full md:w-1/4">
                      <FormLabel>Telefone*</FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          {...field}
                          value={form.getValues('telefone')}
                          maxLength={15}
                          onChange={handleChangeTelefone}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex items-start gap-6 max-md:flex-col">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="w-full md:w-[35%]">
                      <FormLabel>E-mail*</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          {...field}
                          value={form.getValues('email')}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="cep"
                  render={({ field }) => (
                    <FormItem className="w-full md:w-1/5">
                      <FormLabel>CEP*</FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          {...field}
                          value={form.getValues('cep')}
                          maxLength={9}
                          onChange={handleChangeCEP}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="endereco"
                  render={({ field }) => (
                    <FormItem className="w-full md:w-[45%]">
                      <FormLabel>Endereço*</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          {...field}
                          value={form.getValues('endereco')}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex items-start gap-6 max-md:flex-col">
                <FormField
                  control={form.control}
                  name="numero"
                  render={({ field }) => (
                    <FormItem className="w-full md:w-1/4">
                      <FormLabel>Número*</FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          {...field}
                          value={form.getValues('numero')}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="complemento"
                  render={({ field }) => (
                    <FormItem className="w-full md:w-1/5">
                      <FormLabel>Complemento</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          {...field}
                          value={form.getValues('complemento')}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="bairro"
                  render={({ field }) => (
                    <FormItem className="w-full md:w-1/5">
                      <FormLabel>Bairro*</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          {...field}
                          value={form.getValues('bairro')}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="cidade"
                  render={({ field }) => (
                    <FormItem className="w-full md:w-1/5">
                      <FormLabel>Cidade*</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          {...field}
                          value={form.getValues('cidade')}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="uf"
                  render={({ field }) => (
                    <FormItem className="w-full md:w-1/5">
                      <FormLabel>UF*</FormLabel>
                      <FormControl>
                        <Select defaultValue={form.getValues('uf')}>
                          <SelectTrigger>
                            <SelectValue placeholder={form.getValues('uf')} />
                          </SelectTrigger>
                          <SelectContent>
                            {ufOptions}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
        </fieldset>

        <div className="flex items-center justify-end">
          <Button type="submit">Salvar</Button>
        </div>
      </form>
    </Form>
  )
}