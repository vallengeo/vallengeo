"use client";

import { usePathname } from "next/navigation";
import { useFormState } from "@/contexts/formCadastroPFContext";
import { mapearEstados, convertUFToState } from "@/validation/estados";
import {
  imovelFormData,
  imovelFormSchema,
} from "@/validation/imovel/imovel";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { getCep } from "@/service/localidadeService";
import { handlePreviousStep, handleNextStep } from "./navigate";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarIcon, PenSquare as LucidePenSquare } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import Mapa from "../../../_components/mapa";
import InputMask from "react-input-mask";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export function FormCadastroImovel() {
  const pathname = usePathname();
  const municipio = pathname.split("/")[1];
  const { toast } = useToast();
  const { formData, setFormData } = useFormState();

  const form = useForm<imovelFormData>({
    mode: "all",
    criteriaMode: "all",
    resolver: zodResolver(imovelFormSchema),
    defaultValues: formData,
  });

  const {
    setValue,
    formState: { isValid },
  } = form;

  const onSubmit: SubmitHandler<imovelFormData> = async (data) => {
    setFormData((prev: any) => ({ ...prev, ...data }));
    console.log(formData);

    await handleNextStep(municipio);
  };

  const ufOptions = Object.entries(mapearEstados).map(([value, label]) => (
    <SelectItem value={value} key={value}>
      {label}
    </SelectItem>
  ));

  const consultarCep = async (value: string) => {
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

      setValue("informacaoImovel.endereco.logradouro", logradouro);
      setValue("informacaoImovel.endereco.complemento", complemento);
      setValue("informacaoImovel.endereco.bairro", bairro);
      setValue("informacaoImovel.endereco.idMunicipio", municipio.id);
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <fieldset className="bg-white border border-input rounded-2xl p-6">
          <h2 className="text-xl font-medium">Georeferenciamento</h2>

          <Mapa />
        </fieldset>

        <fieldset className="bg-white border border-input rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-medium">Informações do imóvel</h2>
              <p>
                Informe todos os dados para continuar o processo de
                cadastramento de imóvel.
              </p>
            </div>

            <Button
              type="button"
              variant="no-style"
              size="no-style"
              className="text-lg inline-flex items-center gap-2"
            >
              <LucidePenSquare size={20} />
              Editar
            </Button>
          </div>

          <div className="space-y-6 mt-6">
            <div className="flex items-start gap-6 flex-col md:flex-row">
              <FormField
                control={form.control}
                name="informacaoImovel.endereco.cep"
                render={({ field }) => (
                  <FormItem className="w-full md:w-[30%]">
                    <FormLabel>CEP*</FormLabel>
                    <FormControl>
                      <InputMask
                        mask="99999-999"
                        value={field.value}
                        onChange={field.onChange}
                        onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                          consultarCep(e.target.value);
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
                control={form.control}
                name="informacaoImovel.endereco.logradouro"
                render={({ field }) => (
                  <FormItem className="w-full md:w-[35%]">
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
                control={form.control}
                name="informacaoImovel.endereco.numero"
                render={({ field }) => (
                  <FormItem className="w-full md:w-1/4">
                    <FormLabel>Número*</FormLabel>
                    <FormControl>
                      <Input type="tel" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="informacaoImovel.endereco.complemento"
                render={({ field }) => (
                  <FormItem className="w-full md:w-1/4">
                    <FormLabel>Complemento</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="informacaoImovel.endereco.bairro"
                render={({ field }) => (
                  <FormItem className="w-full md:w-1/4">
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
        </fieldset>

        <fieldset className="bg-white border border-input rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-medium">Caracterização do imóvel</h2>
              <p>
                Informe todos os dados para continuar o processo de
                cadastramento de imóvel.
              </p>
            </div>

            <Button
              type="button"
              variant="no-style"
              size="no-style"
              className="text-lg inline-flex items-center gap-2"
            >
              <LucidePenSquare size={20} />
              Editar
            </Button>
          </div>

          <div className="space-y-6 mt-6">
            <div className="flex items-start gap-6 flex-col md:flex-row">
              <FormField
                control={form.control}
                name="caracterizacaoImovel.setor"
                render={({ field }) => (
                  <FormItem className="w-full md:w-1/3">
                    <FormLabel>Setor*</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="caracterizacaoImovel.quadra"
                render={({ field }) => (
                  <FormItem className="w-full md:w-1/3">
                    <FormLabel>Quadra*</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="caracterizacaoImovel.lote"
                render={({ field }) => (
                  <FormItem className="w-full md:w-1/3">
                    <FormLabel>Lote*</FormLabel>
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
                control={form.control}
                name="caracterizacaoImovel.unidade"
                render={({ field }) => (
                  <FormItem className="w-full md:w-1/2">
                    <FormLabel>Unidade</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="caracterizacaoImovel.areaTerreno"
                render={({ field }) => (
                  <FormItem className="w-full md:w-1/4">
                    <FormLabel>Área do terreno*</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="caracterizacaoImovel.testadaPrincipal"
                render={({ field }) => (
                  <FormItem className="w-full md:w-1/4">
                    <FormLabel>Testada principal*</FormLabel>
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
                control={form.control}
                name="caracterizacaoImovel.fracaoIdeal"
                render={({ field }) => (
                  <FormItem className="w-full md:w-1/2">
                    <FormLabel>Fração ideal</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="caracterizacaoImovel.dataInclusao"
                render={({ field }) => (
                  <FormItem className="w-full md:w-2/5">
                    <FormLabel>Data de inclusão*</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className="h-8 w-full rounded-3xl border border-input px-3 py-2 text-sm justify-start bg-transparent"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value ? (
                              format(field.value, "PPP", { locale: ptBR })
                            ) : (
                              <span>Selecione a data</span>
                            )}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </fieldset>

        <div className="flex justify-between items-center flex-wrap gap-4">
          <Button
            type="button"
            onClick={async () => await handlePreviousStep(municipio)}
            variant="secondary"
          >
            Voltar
          </Button>

          <div className="space-x-4">
            <Button type="button" variant="secondary" disabled={!isValid}>
              Continuar depois
            </Button>
            <Button type="submit" disabled={!isValid}>
              Avançar
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
