import { dadosPessoaisData } from "@/validation/imovel/representante";
import { useFormContext, useFieldArray } from "react-hook-form";
import { ufOptions, convertUFToState } from "@/validation/estados";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, } from "@/components/ui/tooltip"
import { X as LucideX, Info as LucideInfo } from "lucide-react";
import { Aviso } from "./aviso";

export function CadastroRepresentantes() {
  const { control, watch, formState: { errors } } = useFormContext<dadosPessoaisData>()

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'representantes',
  })

  return (
    <>
      {fields.map((field, index) => {
        const tipoContato = watch(`representantes.${index}.tipo_contato`);

        return (
          <div key={field.id} className="space-y-6">
            <div className="bg-white border border-input rounded-2xl p-6 space-y-6 relative overflow-hidden">
              <div>
                <h2 className="text-xl font-medium">Representante do imóvel - Proprietário(a)</h2>
                <p>Informe todos os dados para iniciar o processo de cadastramento de imóvel.</p>

                {index > 0 && (
                  <TooltipProvider delayDuration={200}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          type="button"
                          onClick={() => remove(index)}
                          variant="no-style"
                          size="no-style"
                          className="absolute right-0 top-0 p-2.5 bg-foreground text-white rounded-bl-2xl hover:bg-foreground/90 rounded-tl-none rounded-br-none"
                        >
                          <LucideX size={20} />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="left">
                        <p>Remover Representante</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>

              <div className="flex items-start gap-6 flex-col md:flex-row">
                <FormField
                  control={control}
                  name={`representantes.${index}.nome`}
                  render={({ field }) => (
                    <FormItem className="w-full md:w-1/4">
                      <FormLabel>Nome*</FormLabel>
                      <FormControl>
                        <Input type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name={`representantes.${index}.cpf`}
                  render={({ field }) => (
                    <FormItem className="w-full md:w-1/5">
                      <FormLabel>CPF*</FormLabel>
                      <FormControl>
                        <Input type="text" maxLength={14} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name={`representantes.${index}.rg`}
                  render={({ field }) => (
                    <FormItem className="w-full md:w-1/5">
                      <FormLabel>RG*</FormLabel>
                      <FormControl>
                        <Input type="text" maxLength={10} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name={`representantes.${index}.telefone`}
                  render={({ field }) => (
                    <FormItem className="w-full md:w-1/4">
                      <FormLabel>Telefone*</FormLabel>
                      <FormControl>
                        <Input type="text" maxLength={15} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex items-start gap-6 flex-col md:flex-row">
                <FormField
                  control={control}
                  name={`representantes.${index}.email`}
                  render={({ field }) => (
                    <FormItem className="w-full md:w-[35%]">
                      <FormLabel>E-mail*</FormLabel>
                      <FormControl>
                        <Input type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name={`representantes.${index}.cep`}
                  render={({ field }) => (
                    <FormItem className="w-full md:w-1/5">
                      <div className="flex items-center gap-1.5">
                        <FormLabel className="leading-6">CEP*</FormLabel>
                        <TooltipProvider delayDuration={200}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button type="button" variant="no-style" size="no-style">
                                <LucideInfo size={16} />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Insira o CEP para preenchimento automático do endereço.</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <FormControl>
                        <Input type="text" maxLength={9} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name={`representantes.${index}.endereco`}
                  render={({ field }) => (
                    <FormItem className="w-full md:w-[45%]">
                      <FormLabel>Endereço*</FormLabel>
                      <FormControl>
                        <Input type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex items-start gap-6 flex-col md:flex-row">
                <FormField
                  control={control}
                  name={`representantes.${index}.numero`}
                  render={({ field }) => (
                    <FormItem className="w-full md:w-1/5">
                      <FormLabel>Número*</FormLabel>
                      <FormControl>
                        <Input type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name={`representantes.${index}.complemento`}
                  render={({ field }) => (
                    <FormItem className="w-full md:w-1/5">
                      <FormLabel>Complemento</FormLabel>
                      <FormControl>
                        <Input type="text" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name={`representantes.${index}.bairro`}
                  render={({ field }) => (
                    <FormItem className="w-full md:w-1/5">
                      <FormLabel>Bairro*</FormLabel>
                      <FormControl>
                        <Input type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name={`representantes.${index}.cidade`}
                  render={({ field }) => (
                    <FormItem className="w-full md:w-1/5">
                      <FormLabel>Cidade*</FormLabel>
                      <FormControl>
                        <Input type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name={`representantes.${index}.uf`}
                  render={({ field }) => (
                    <FormItem className="w-full md:w-1/5">
                      <FormLabel>UF*</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={convertUFToState(field.value)} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {ufOptions}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="bg-white border border-input rounded-2xl p-6 space-y-6 relative overflow-hidden">
              <div className="flex items-start flex-wrap gap-4">
                <h2 className="text-xl font-semibold">Informação de contato:</h2>

                <FormField
                  control={control}
                  name={`representantes.${index}.tipo_contato`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          {...field}
                          className="flex items-center flex-wrap gap-4"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="representante" />
                            </FormControl>
                            <FormLabel className="text-base font-normal">
                              Representante do imóvel
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="responsavel" />
                            </FormControl>
                            <FormLabel className="text-base font-normal">
                              Responsável legal
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="outro" />
                            </FormControl>
                            <FormLabel className="text-base font-normal">
                              Outro
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              {errors.representantes?.[index]?.tipo_contato && <p>{errors.representantes?.[index]?.tipo_contato?.message}</p>}

              {(tipoContato === 'responsavel' || tipoContato === 'outro') && (
                <div className="space-y-6 mt-6">
                  <Aviso
                    type="warning"
                    message="Na seção de documentos, é imprescindível anexar a procuração, podendo esta ser simples ou autenticada."
                    size={24}
                    className="justify-start"
                  />

                  <div className="grid grid-cols-4 gap-6">
                    <FormField
                      control={control}
                      name={`representantes.${index}.nome_contato`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome completo*</FormLabel>
                          <FormControl>
                            <Input type="text" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={control}
                      name={`representantes.${index}.email_contato`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>E-mail*</FormLabel>
                          <FormControl>
                            <Input type="email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={control}
                      name={`representantes.${index}.telefone_contato`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Telefone*</FormLabel>
                          <FormControl>
                            <Input type="tel" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={control}
                      name={`representantes.${index}.documento`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Documento*</FormLabel>
                          <FormControl>
                            <Input type="tel" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        )
      })}

      <div className="bg-white border border-input rounded-2xl p-6 flex items-center justify-between flex-wrap">
        <h2 className="text-xl font-medium">Deseja vincular um novo representante ao imóvel?</h2>

        <div className="flex items-center gap-6">
          <Button
            type="button"
            variant="default"
            onClick={() => append({
              nome: '',
              cpf: '',
              rg: '',
              telefone: '',
              email: '',
              cep: '',
              endereco: '',
              numero: '',
              complemento: '',
              bairro: '',
              cidade: '',
              uf: '',
              tipo_contato: 'responsavel',
              nome_contato: '',
              email_contato: '',
              telefone_contato: '',
              documento: '',
            })}
          >
            Adicionar
          </Button>
        </div>
      </div>
    </>
  )
}
