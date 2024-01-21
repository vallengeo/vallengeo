import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, SubmitHandler } from "react-hook-form";

import { useFormState } from "@/contexts/Imovel/FormContext";

import {
  representanteFormData,
  representanteFormSchema
} from "@/validation/cadastroRepresentantePF"
import { mapearEstados } from "@/validation/estados"

import { formatarCampo, consultarCep } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function CadastroRepresentantePF() {
  const { onHandleNext, setFormData, formData } = useFormState()

  const form = useForm<representanteFormData>({
    resolver: zodResolver(representanteFormSchema),
    defaultValues: formData
  })

  const onSubmit: SubmitHandler<representanteFormData> = (data) => {
    setFormData((prev: any) => ({ ...prev, ...data }));
    onHandleNext()
  }

  const ufOptions = Object.entries(mapearEstados).map(([value, label]) => (
    <SelectItem value={value} key={value}>
      {label}
    </SelectItem>
  ))

  const handleChangeCPF = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const formattedValue = formatarCampo(rawValue, 'CPF')
    form.setValue('cpf', formattedValue)
  }

  const handleChangeRG = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value
    const formattedValue = formatarCampo(rawValue, 'RG')
    form.setValue('rg', formattedValue)
  }

  const handleChangeCEP = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value
    const formattedValue = formatarCampo(rawValue, 'CEP')
    form.setValue('cep', formattedValue)

    if (formattedValue.length === 9) {
      try {
        const response = await consultarCep(formattedValue)

        if (response.erro) {
          return
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

  const handleChangeTelefone = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const formattedValue = formatarCampo(rawValue, 'Telefone');
    form.setValue('telefone', formattedValue);
  };

  const handleChangeTelefoneContato = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const formattedValue = formatarCampo(rawValue, 'Telefone');
    form.setValue('telefone_contato', formattedValue);
  };

  return (
    <Form {...form}>
      <pre>
        {JSON.stringify(formData, null, 2)}
      </pre>

      <form onSubmit={form.handleSubmit(onSubmit)}>
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
                  <div className="w-1/4">
                    <FormField
                      control={form.control}
                      name="nome"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome*</FormLabel>
                          <FormControl>
                            <Input type="text" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="w-1/5">
                    <FormField
                      control={form.control}
                      name="cpf"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor="cpf">CPF*</FormLabel>
                          <FormControl>
                            <Input
                              id="cpf"
                              type="text"
                              maxLength={14}
                              {...field}
                              onChange={handleChangeCPF}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="w-1/5">
                    <FormField
                      control={form.control}
                      name="rg"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor="rg">RG*</FormLabel>
                          <FormControl>
                            <Input
                              id="rg"
                              type="text"
                              maxLength={10}
                              {...field}
                              onChange={handleChangeRG}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="w-1/4">
                    <FormField
                      control={form.control}
                      name="telefone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor="telefone">Telefone*</FormLabel>
                          <FormControl>
                            <Input
                              id="telefone"
                              type="text"
                              maxLength={15}
                              {...field}
                              onChange={handleChangeTelefone}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="w-[35%]">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor="email">E-mail*</FormLabel>
                          <FormControl>
                            <Input
                              id="email"
                              type="email"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="w-1/5">
                    <FormField
                      control={form.control}
                      name="cep"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor="cep">CEP*</FormLabel>
                          <FormControl>
                            <Input
                              id="cep"
                              type="text"
                              {...field}
                              onChange={handleChangeCEP}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="w-[45%]">
                    <FormField
                      control={form.control}
                      name="endereco"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor="endereco">Endereço*</FormLabel>
                          <FormControl>
                            <Input
                              id="endereco"
                              type="text"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="w-1/5">
                    <FormField
                      control={form.control}
                      name="numero"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor="numero">Número*</FormLabel>
                          <FormControl>
                            <Input
                              id="numero"
                              type="text"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="w-1/5">
                    <FormField
                      control={form.control}
                      name="complemento"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor="complemento">Complemento</FormLabel>
                          <FormControl>
                            <Input
                              id="complemento"
                              type="text"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="w-1/5">
                    <FormField
                      control={form.control}
                      name="bairro"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor="bairro">Bairro*</FormLabel>
                          <FormControl>
                            <Input
                              id="bairro"
                              type="text"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="w-1/5">
                    <FormField
                      control={form.control}
                      name="cidade"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor="cidade">Cidade*</FormLabel>
                          <FormControl>
                            <Input
                              id="cidade"
                              type="text"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="w-1/5">
                    <FormField
                      control={form.control}
                      name="uf"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor="uf">UF*</FormLabel>
                          <FormControl>
                            <Select onValueChange={field.onChange}>
                              <SelectTrigger id="uf" {...field}>
                                <SelectValue placeholder={field.value} />
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
          </div>

          <fieldset className="space-y-6">
            <legend className="sr-only">Informação de contato</legend>

            <header className="flex items-center gap-4">
              <h2 className="text-xl">Informação de contato:</h2>

              <FormField
                control={form.control}
                name="tipo_contato"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <RadioGroup
                        defaultValue="outro"
                        onValueChange={field.onChange}
                        className="flex items-center gap-4"
                        {...field}
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="outro" />
                          </FormControl>
                          <FormLabel className="text-base font-normal">
                            outro
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="representante" />
                          </FormControl>
                          <FormLabel className="text-base font-normal">
                            o representante do imóvel
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                  </FormItem>
                )}
              />
            </header>

            <div className="flex items-start gap-6">
              <div className="w-[35%]">
                <FormField
                  control={form.control}
                  name="nome_contato"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="nome-contato">Nome completo*</FormLabel>
                      <FormControl>
                        <Input
                          id="nome-contato"
                          type="text"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="w-1/4">
                <FormField
                  control={form.control}
                  name="telefone_contato"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="telefone-contato">Telefone*</FormLabel>
                      <FormControl>
                        <Input
                          id="telefone-contato"
                          type="tel"
                          maxLength={15}
                          {...field}
                          onChange={handleChangeTelefoneContato}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </fieldset>
        </div>

        <div className="flex justify-end mt-6">
          <Button type="submit">Avançar</Button>
        </div>
      </form>
    </Form>
  )
}