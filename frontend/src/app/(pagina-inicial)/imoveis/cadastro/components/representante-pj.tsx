import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, SubmitHandler } from "react-hook-form";

import { useFormState } from "@/contexts/Imovel/FormContext";

import {
  representanteFormData,
  representanteFormSchema
} from "@/validation/cadastroRepresentantePJ"
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

export function CadastroRepresentantePJ() {
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
    form.setValue('cpf_representante', formattedValue)
  }

  const handleChangeCNPJ = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value
    const formattedValue = formatarCampo(rawValue, 'CNPJ')
    form.setValue('cnpj', formattedValue)
  }

  const handleChangeRG = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value
    const formattedValue = formatarCampo(rawValue, 'RG')
    form.setValue('rg_representante', formattedValue)
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

  const handleChangeCEPRepresentante = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value
    const formattedValue = formatarCampo(rawValue, 'CEP')
    form.setValue('cep_representante', formattedValue)

    if (formattedValue.length === 9) {
      try {
        const response = await consultarCep(formattedValue)

        if (response.erro) {
          return
        }

        form.setValue('endereco_representante', response.logradouro)
        form.setValue('complemento_representante', response.complemento)
        form.setValue('bairro_representante', response.bairro)
        form.setValue('cidade_representante', response.localidade)
        form.setValue('uf_representante', response.uf)
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

  const handleChangeTelefoneRepresentante = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const formattedValue = formatarCampo(rawValue, 'Telefone');
    form.setValue('telefone_representante', formattedValue);
  };

  const handleChangeTelefoneContato = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const formattedValue = formatarCampo(rawValue, 'Telefone');
    form.setValue('telefone_contato', formattedValue);
  };

  return (
    <Form {...form}>
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
                <div className="flex items-start gap-6 max-md:flex-col">
                  <div className="w-full md:w-1/2">
                    <FormField
                      control={form.control}
                      name="razao_social"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor="razao-social">Razão Social da empresa*</FormLabel>
                          <FormControl>
                            <Input
                              id="razao-social"
                              type="text" {...field}
                              className="max-w-none"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="w-full md:w-1/4">
                    <FormField
                      control={form.control}
                      name="cnpj"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor="cpf">CNPJ*</FormLabel>
                          <FormControl>
                            <Input
                              id="cnpj"
                              type="text"
                              maxLength={18}
                              {...field}
                              onChange={handleChangeCNPJ}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="w-full md:w-1/4">
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

                <div className="flex items-start gap-6 max-md:flex-col">
                  <div className="w-full md:w-1/4">
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

                  <div className="w-full md:w-1/5">
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
                              maxLength={9}
                              {...field}
                              onChange={handleChangeCEP}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="w-full md:flex-1">
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
                              className="max-w-none"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="flex items-start gap-6 max-md:flex-col">
                  <div className="w-full md:w-1/5">
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

                  <div className="w-full md:w-1/5">
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

                  <div className="w-full md:w-1/5">
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

                  <div className="w-full md:w-1/5">
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

                  <div className="w-full md:w-1/5">
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

          <fieldset className="border-t border-t-[#C3C3C3] pt-6 mt-6">
            <legend className="sr-only m-0">Dados representante</legend>

            <div className="space-y-6">
              <div className="flex items-start gap-6 max-md:flex-col">
                <div className="w-full md:flex-1">
                  <FormField
                    control={form.control}
                    name="nome_representante"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="nome-representante">Nome completo representante da empresa*</FormLabel>
                        <FormControl>
                          <Input
                            id="nome-representante"
                            type="text"
                            {...field}
                            className="max-w-none"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="w-full md:w-1/5">
                  <FormField
                    control={form.control}
                    name="cpf_representante"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="cpf-representante">CPF*</FormLabel>
                        <FormControl>
                          <Input
                            id="cpf-representante"
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

                <div className="w-full md:w-1/5">
                  <FormField
                    control={form.control}
                    name="rg_representante"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="rg-representante">RG*</FormLabel>
                        <FormControl>
                          <Input
                            id="rg-representante"
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

                <div className="w-full md:w-1/5">
                  <FormField
                    control={form.control}
                    name="telefone_representante"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="telefone-representante">Telefone*</FormLabel>
                        <FormControl>
                          <Input
                            id="telefone-representante"
                            type="tel"
                            maxLength={15}
                            {...field}
                            onChange={handleChangeTelefoneRepresentante}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="flex items-start gap-6 max-md:flex-col">
                <div className="w-full md:w-1/4">
                  <FormField
                    control={form.control}
                    name="email_representante"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="email-representante">E-mail*</FormLabel>
                        <FormControl>
                          <Input
                            id="email-representante"
                            type="email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="w-full md:w-1/5">
                  <FormField
                    control={form.control}
                    name="cep_representante"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="cep-representante">CEP*</FormLabel>
                        <FormControl>
                          <Input
                            id="cep-representante"
                            type="text"
                            maxLength={9}
                            {...field}
                            onChange={handleChangeCEPRepresentante}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="w-full md:flex-1">
                  <FormField
                    control={form.control}
                    name="endereco_representante"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="endereco-representante">Endereço*</FormLabel>
                        <FormControl>
                          <Input
                            id="endereco-representante"
                            type="text"
                            {...field}
                            className="max-w-none"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="flex items-start gap-6 max-md:flex-col">
                <div className="w-full md:w-1/5">
                  <FormField
                    control={form.control}
                    name="numero_representante"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="numero-representante">Número*</FormLabel>
                        <FormControl>
                          <Input
                            id="numero-representante"
                            type="text"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="w-full md:w-1/5">
                  <FormField
                    control={form.control}
                    name="complemento_representante"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="complemento_representante">Complemento</FormLabel>
                        <FormControl>
                          <Input
                            id="complemento_representante"
                            type="text"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="w-full md:w-1/5">
                  <FormField
                    control={form.control}
                    name="bairro_representante"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="bairro_representante">Bairro*</FormLabel>
                        <FormControl>
                          <Input
                            id="bairro_representante"
                            type="text"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="w-full md:w-1/5">
                  <FormField
                    control={form.control}
                    name="cidade_representante"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="cidade_representante">Cidade*</FormLabel>
                        <FormControl>
                          <Input
                            id="cidade_representante"
                            type="text"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="w-full md:w-1/5">
                  <FormField
                    control={form.control}
                    name="uf_representante"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="uf_representante">UF*</FormLabel>
                        <FormControl>
                          <Select onValueChange={field.onChange}>
                            <SelectTrigger id="uf_representante" {...field}>
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

          <fieldset className="space-y-6">
            <legend className="sr-only">Informação de contato</legend>

            <header className="flex items-center flex-wrap gap-4">
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
                        className="flex items-center flex-wrap gap-4"
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

            <div className="flex items-start gap-6 max-md:flex-col">
              <div className="w-full md:w-[35%]">
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

              <div className="w-full md:w-1/4">
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