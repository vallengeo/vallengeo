"use client";

import { usePathname } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  dadosEmpresaSchema,
  dadosEmpresaData,
} from "@/validation/imovel/representante";
import { useFormState } from "@/contexts/formCadastroPJContext";
import { Form } from "@/components/ui/form";
import { useFieldArray } from "react-hook-form";
import { ufOptions, convertUFToState } from "@/validation/estados";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { getCep } from "@/service/localidadeService";
import { handleNextStep } from "./navigate";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { X as LucideX } from "lucide-react";
import { Aviso } from "../../../_components/aviso";
import { useToast } from "@/components/ui/use-toast";
import InputMask from "react-input-mask";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export function FormCadastroRepresentantes() {
  const pathname = usePathname();
  const municipio = pathname.split("/")[1];
  const { toast } = useToast();
  const { formData, setFormData } = useFormState();

  const form = useForm<dadosEmpresaData>({
    mode: 'all',
    criteriaMode: 'all',
    resolver: zodResolver(dadosEmpresaSchema),
    defaultValues: formData,
  });

  const {
    control,
    setValue,
    watch,
    formState: { errors, isValid },
  } = form;

  const onSubmit: SubmitHandler<dadosEmpresaData> = async (data) => {
    setFormData((prev: any) => ({ ...prev, ...data }));
    console.log(data);

    await handleNextStep(municipio);
  };

  const { fields, append, remove } = useFieldArray({
    control,
    name: "representantes",
  });

  const consultarCep = async (index: number, value: string) => {
    try {
      const cep = value.replace(/\D/g, "");
      if (cep.length < 8) {
        return;
      }

      const response = await getCep(cep);
      const { logradouro, complemento, bairro, municipio, error } =
        response.data;

      if (error) {
        toast({
          description: "CEP não encontrado",
          variant: "destructive",
        });
        return;
      }

      setValue(`representantes.${index}.endereco.logradouro`, logradouro);
      setValue(`representantes.${index}.endereco.complemento`, complemento);
      setValue(`representantes.${index}.endereco.bairro`, bairro);
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message;

      toast({
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-6">
          <fieldset className="bg-white border border-input rounded-2xl p-6 space-y-6">
            <div>
              <h2 className="text-xl font-medium">Informações da empresa</h2>
              <p>
                Informe todos os dados para continuar o processo de
                cadastramento de imóvel.
              </p>
            </div>

            <div className="flex items-start gap-6 flex-col md:flex-row">
              <FormField
                control={control}
                name="razaoSocial"
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormLabel>Razão Social da empresa*</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="cnpj"
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormLabel>CNPJ*</FormLabel>
                    <FormControl>
                      <InputMask
                        mask="99.999.999/9999-99"
                        value={field.value}
                        onChange={field.onChange}
                      >
                        {(inputProps: InputProps) => (
                          <Input type="tel" {...inputProps} />
                        )}
                      </InputMask>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex items-start gap-6 flex-col md:flex-row">
              <FormField
                control={control}
                name="responsavel.email"
                render={({ field }) => (
                  <FormItem className="w-[40%]">
                    <FormLabel>E-mail*</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="responsavel.endereco.cep"
                render={({ field }) => (
                  <FormItem className="w-1/5">
                    <FormLabel className="leading-6">CEP*</FormLabel>
                    <FormControl>
                      <InputMask
                        mask="99999-999"
                        value={field.value}
                        onChange={field.onChange}
                      >
                        {(inputProps: InputProps) => (
                          <Input type="tel" {...inputProps} />
                        )}
                      </InputMask>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="responsavel.endereco.logradouro"
                render={({ field }) => (
                  <FormItem className="w-[40%]">
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
                name="responsavel.endereco.numero"
                render={({ field }) => (
                  <FormItem className="w-full md:w-1/5">
                    <FormLabel>Número*</FormLabel>
                    <FormControl>
                      <Input type="tel" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="responsavel.endereco.complemento"
                render={({ field }) => (
                  <FormItem className="w-full md:w-1/5">
                    <FormLabel>Complemento</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="responsavel.endereco.bairro"
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
            </div>
          </fieldset>

          {fields.map((field, index) => {
            return (
              <div key={field.id} className="space-y-6">
                <div className="bg-white border border-input rounded-2xl p-6 space-y-6 relative overflow-hidden">
                  <div>
                    <h2 className="text-xl font-medium">
                      Representante do imóvel - Proprietário(a)
                    </h2>
                    <p>
                      Informe todos os dados para iniciar o processo de
                      cadastramento de imóvel.
                    </p>

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
                            <InputMask
                              mask="999.999.999-99"
                              value={field.value}
                              onChange={field.onChange}
                            >
                              {(inputProps: InputProps) => (
                                <Input type="tel" {...inputProps} />
                              )}
                            </InputMask>
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
                            <InputMask
                              mask="99.999.999-9"
                              value={field.value}
                              onChange={field.onChange}
                            >
                              {(inputProps: InputProps) => (
                                <Input type="tel" {...inputProps} />
                              )}
                            </InputMask>
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
                            <InputMask
                              mask="(99) 99999-9999"
                              value={field.value}
                              onChange={field.onChange}
                            >
                              {(inputProps: InputProps) => (
                                <Input type="tel" {...inputProps} />
                              )}
                            </InputMask>
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
                      name={`representantes.${index}.endereco.cep`}
                      render={({ field }) => (
                        <FormItem className="w-full md:w-1/5">
                          <FormLabel className="leading-6">CEP*</FormLabel>
                          <FormControl>
                            <InputMask
                              mask="99999-999"
                              value={field.value}
                              onChange={field.onChange}
                              onBlur={(
                                e: React.FocusEvent<HTMLInputElement>
                              ) => {
                                consultarCep(index, e.target.value);
                              }}
                            >
                              {(inputProps: InputProps) => (
                                <Input type="tel" {...inputProps} />
                              )}
                            </InputMask>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={control}
                      name={`representantes.${index}.endereco.logradouro`}
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
                      name={`representantes.${index}.endereco.numero`}
                      render={({ field }) => (
                        <FormItem className="w-full md:w-1/5">
                          <FormLabel>Número*</FormLabel>
                          <FormControl>
                            <Input type="tel" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={control}
                      name={`representantes.${index}.endereco.complemento`}
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
                      name={`representantes.${index}.endereco.bairro`}
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
                  </div>
                </div>

                <div className="bg-white border border-input rounded-2xl p-6 space-y-6 relative overflow-hidden">
                  <div className="flex items-start flex-wrap gap-4">
                    <h2 className="text-xl font-semibold">
                      Informação de contato:
                    </h2>
                  </div>
                </div>
              </div>
            );
          })}

          <div className="bg-white border border-input rounded-2xl p-6 flex items-center justify-between flex-wrap">
            <h2 className="text-xl font-medium">
              Deseja vincular um novo representante ao imóvel?
            </h2>

            <div className="flex items-center gap-6">
              <Button
                type="button"
                variant="default"
              >
                Adicionar
              </Button>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <Button type="submit" disabled={!isValid}>
            Avançar
          </Button>
        </div>
      </form>
    </Form>
  );
}
