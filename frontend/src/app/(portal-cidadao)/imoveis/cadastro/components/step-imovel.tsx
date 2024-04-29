import { useFormState } from "@/contexts/Imovel/FormContext";
import { cn, consultarCep, formatarCampo } from "@/lib/utils";
import { mapearEstados } from "@/validation/estados";
import {
  imovelFormData,
  imovelFormSchema,
  mapearGrupos,
} from "@/validation/imovel/imovel";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { SubmitHandler, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
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
  SelectValue
} from "@/components/ui/select";
import {
  CalendarIcon,
  PenSquare as LucidePenSquare
} from "lucide-react";

export function CadastroImovel() {
  const { onHandleBack, setFormData, formData } = useFormState();

  const form = useForm<imovelFormData>({
    resolver: zodResolver(imovelFormSchema),
    defaultValues: formData,
  })

  const onSubmit: SubmitHandler<imovelFormData> = (data) => {
    setFormData((prev: any) => ({ ...prev, ...data }));
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

  const handleChangeCEP = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value
    const formattedValue = formatarCampo(rawValue, 'CEP')
    form.setValue('imovel_cep', formattedValue)

    if (formattedValue.length === 9) {
      try {
        const response = await consultarCep(formattedValue)

        if (response.erro) {
          return
        }

        form.setValue('imovel_endereco', response.logradouro)
        form.setValue('imovel_complemento', response.complemento)
        form.setValue('imovel_bairro', response.bairro)
        form.setValue('imovel_cidade', response.localidade)
        form.setValue('imovel_uf', response.uf)
      } catch (error) {
        console.error('Erro ao consultar CEP:', error)
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <fieldset className="bg-white border border-[#E8E1E1] rounded-2xl p-6">
          <h2 className="text-xl font-medium">Georeferenciamento</h2>

          {/* TODO: Campo de upload da localidade */}
        </fieldset>

        <fieldset className="bg-white border border-[#E8E1E1] rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-medium">Informações do imóvel</h2>
              <p>Informe todos os dados para continuar o processo de cadastramento de imóvel.</p>
            </div>

            <button className="text-lg inline-flex items-center gap-2">
              <LucidePenSquare size={20} />
              Editar
            </button>
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
                name="imovel_cep"
                render={({ field }) => (
                  <FormItem className="w-full md:w-[30%]">
                    <FormLabel>CEP*</FormLabel>
                    <FormControl>
                      <Input type="text" maxLength={8} {...field} onChange={handleChangeCEP} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="imovel_endereco"
                render={({ field }) => (
                  <FormItem className="w-full md:w-[35%]">
                    <FormLabel>Endereço*</FormLabel>
                    <FormControl>
                      <Input type="text" className="max-w-none" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex items-start gap-6 flex-col md:flex-row">
              <FormField
                control={form.control}
                name="imovel_numero"
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
                name="imovel_complemento"
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
                name="imovel_bairro"
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
                name="imovel_uf"
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
                name="imovel_cidade"
                render={({ field }) => (
                  <FormItem className="w-full md:w-1/2">
                    <FormLabel>Cidade*</FormLabel>
                    <FormControl>
                      <Input type="text" className="max-w-none" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </fieldset>

        <fieldset className="bg-white border border-[#E8E1E1] rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-medium">Caracterização do imóvel</h2>
              <p>Informe todos os dados para continuar o processo de cadastramento de imóvel.</p>
            </div>

            <button className="text-lg inline-flex items-center gap-2">
              <LucidePenSquare size={20} />
              Editar
            </button>
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
                            className={cn("h-8 w-full rounded-3xl border border-input px-3 py-2 text-sm justify-start bg-transparent")}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value ? format(field.value, "PPP") : <span>Selecione a data</span>}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          lang="pt-br"
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
          <Button variant="secondary" onClick={onHandleBack}>Voltar</Button>

          <div className="space-x-4">
            <Button variant="secondary">Continuar depois</Button>
            <Button type="submit">Finalizar</Button>
          </div>
        </div>
      </form>
    </Form>
  )
}
