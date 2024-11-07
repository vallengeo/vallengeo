"use client"

import { useFormState } from "@/contexts/Imovel/FormContext";
import { mapearEstados } from "@/validation/estados";
import { imovelFormData, imovelFormSchema, mapearGrupos } from "@/validation/imovel/imovel";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { getCep } from "@/service/localidadeService";
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon, PenSquare as LucidePenSquare } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import Mapa from "./mapa";
import InputMask from "react-input-mask";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export function CadastroImovel() {
  const { toast } = useToast();
  const { onHandleBack, onHandleNext, setFormData, formData } = useFormState();

  const form = useForm<imovelFormData>({
    mode: 'all',
    criteriaMode: 'all',
    resolver: zodResolver(imovelFormSchema),
    defaultValues: formData,
  })

  const { setValue, formState: { isValid } } = form

  const onSubmit: SubmitHandler<imovelFormData> = (data) => {
    setFormData((prev: any) => ({ ...prev, ...data }));
    onHandleNext();
    console.log(formData)
  }

  const grupoOptions = Object.entries(mapearGrupos).map(([value, label]) => (
    <SelectItem value={value} key={value}>
      {label}
    </SelectItem>
  ))

  const ufOptions = Object.entries(mapearEstados).map(([value, label]) => (
    <SelectItem value={value} key={value}>
      {label}
    </SelectItem>
  ))

  const consultarCep = async (value: string) => {
    try {
      const cep = value.replace(/\D/g, '');
      if (cep.length < 8) {
        return;
      }

      const response = await getCep(cep);
      const { logradouro, complemento, bairro, municipio, error } = response.data;

      if (error) {
        toast({
          'description': 'CEP não encontrado',
          'variant': 'destructive',
        });
        return;
      }

      setValue('endereco', logradouro);
      setValue('complemento', complemento);
      setValue('bairro', bairro);
      setValue('cidade', municipio.estado.nome);
      setValue('uf', municipio.estado.uf);
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message;

      toast({
        'description': errorMessage,
        'variant': 'destructive',
      });
    }
  }

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
              <p>Informe todos os dados para continuar o processo de cadastramento de imóvel.</p>
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
                name="grupo"
                render={({ field }) => (
                  <FormItem className="w-full md:w-[35%]">
                    <FormLabel>Tipo de grupo ou ocupação/uso*</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange}>
                        <SelectTrigger {...field}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {grupoOptions}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cep"
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
                        {(inputProps: InputProps) => <Input type="tel" {...inputProps} />}
                      </InputMask>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="endereco"
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
                name="numero"
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
                name="complemento"
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
                name="bairro"
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

              <FormField
                control={form.control}
                name="uf"
                render={({ field }) => (
                  <FormItem className="w-full md:w-1/4">
                    <FormLabel>UF*</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange}>
                        <SelectTrigger {...field}>
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

            <div className="flex items-start gap-6 flex-col md:flex-row">
              <FormField
                control={form.control}
                name="cidade"
                render={({ field }) => (
                  <FormItem className="w-full md:w-1/2">
                    <FormLabel>Cidade*</FormLabel>
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
              <p>Informe todos os dados para continuar o processo de cadastramento de imóvel.</p>
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
                name="setor"
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
                name="quadra"
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
                name="lote"
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
                name="unidade"
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
                name="area_terreno"
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
                name="testada"
                render={({ field }) => (
                  <FormItem className="w-full md:w-1/4">
                    <FormLabel>Testada principal*</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex items-start gap-6 flex-col md:flex-row">
              <FormField
                control={form.control}
                name="fracao"
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
                name="data_inclusao"
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
                            {field.value ? format(field.value, "PPP", { locale: ptBR }) : <span>Selecione a data</span>}
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

        <div className="flex justify-end items-center flex-wrap gap-4">
          <Button variant="secondary" onClick={onHandleBack}>Voltar</Button>
          <Button type="submit" disabled={!isValid}>Avançar</Button>
        </div>
      </form>
    </Form>
  )
}
