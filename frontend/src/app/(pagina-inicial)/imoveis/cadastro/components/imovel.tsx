import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, SubmitHandler } from "react-hook-form";

import { useFormState } from "../../../../../contexts/Imovel/FormContext";

import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import {
  imovelFormSchema,
  imovelFormData,
  mapearGrupos,
  mapearDivisoes
} from "@/validation/imovel"
import { mapearEstados } from "@/validation/estados"

import { formatarCampo, consultarCep } from "@/lib/utils";

import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

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

  const divisaoOptions = Object.entries(mapearDivisoes).map(([value, label]) => (
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
          <legend className="sr-only">Informações do imóvel</legend>

          <header className="flex items-center justify-between mb-1">
            <h2 className="text-xl">Informações do imóvel</h2>
            <span className="max-md:hidden">*itens obrigatórios</span>
          </header>

          <p>Informe todos os dados para continuar o processo de cadastramento de imóvel.</p>

          <div className="space-y-6 mt-6">
            <div className="flex items-start gap-6 max-md:flex-col">
              <div className="w-full md:w-[35%]">
                <FormField
                  control={form.control}
                  name="grupo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="grupo">Tipo de grupo ou ocupação/uso*</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange}>
                          <SelectTrigger id="grupo" {...field}>
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
              </div>

              <div className="w-full md:w-[35%]">
                <FormField
                  control={form.control}
                  name="divisao"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="divisao">Tipo de divisão*</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange}>
                          <SelectTrigger id="divisao" {...field}>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {divisaoOptions}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="w-full md:w-[30%]">
                <FormField
                  control={form.control}
                  name="imovel_cep"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="cep">CEP*</FormLabel>
                      <FormControl>
                        <Input
                          id="cep"
                          type="text"
                          maxLength={8}
                          {...field}
                          onChange={handleChangeCEP}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="flex items-start gap-6 max-md:flex-col">
              <div className="w-full md:w-2/5">
                <FormField
                  control={form.control}
                  name="imovel_endereco"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="endereco">Endereço*</FormLabel>
                      <FormControl>
                        <Input
                          id="endereco"
                          type="text"
                          className="max-w-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="w-full md:w-[30%]">
                <FormField
                  control={form.control}
                  name="imovel_numero"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="numero">Número*</FormLabel>
                      <FormControl>
                        <Input
                          id="numero"
                          type="number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="w-full md:w-[30%]">
                <FormField
                  control={form.control}
                  name="imovel_complemento"
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
            </div>

            <div className="flex items-start gap-6 max-md:flex-col">
              <div className="w-full md:w-2/5">
                <FormField
                  control={form.control}
                  name="imovel_bairro"
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

              <div className="w-full md:w-3/5">
                <FormField
                  control={form.control}
                  name="imovel_cidade"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="cidade">Cidade*</FormLabel>
                      <FormControl>
                        <Input
                          id="cidade"
                          type="text"
                          className="max-w-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="w-full md:w-2/5">
                <FormField
                  control={form.control}
                  name="imovel_uf"
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

        <fieldset className="bg-white border border-[#E8E1E1] rounded-2xl p-6">
          <legend className="sr-only">Caracterização do imóvel</legend>

          <header className="flex items-center justify-between mb-1">
            <h2 className="text-xl">Caracterização do imóvel</h2>
            <span className="max-md:hidden">*itens obrigatórios</span>
          </header>

          <p>Informe todos os dados para continuar o processo de cadastramento de imóvel.</p>

          <div className="space-y-6 mt-6">
            <div className="flex items-start gap-6 max-md:flex-col">
              <div className="w-full md:w-1/3">
                <FormField
                  control={form.control}
                  name="setor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="setor">Setor*</FormLabel>
                      <FormControl>
                        <Input
                          id="setor"
                          type="text"
                          className="max-w-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="w-full md:w-1/3">
                <FormField
                  control={form.control}
                  name="quadra"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="quadra">Quadra*</FormLabel>
                      <FormControl>
                        <Input
                          id="quadra"
                          type="text"
                          className="max-w-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="w-full md:w-1/3">
                <FormField
                  control={form.control}
                  name="lote"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="lote">Lote*</FormLabel>
                      <FormControl>
                        <Input
                          id="lote"
                          type="text"
                          className="max-w-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="flex items-start gap-6 max-md:flex-col">
              <div className="w-full md:w-1/2">
                <FormField
                  control={form.control}
                  name="unidade"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="unidade">Unidade</FormLabel>
                      <FormControl>
                        <Input
                          id="unidade"
                          type="text"
                          className="max-w-none"
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
                  name="area_terreno"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="area-terreno">Área do terreno*</FormLabel>
                      <FormControl>
                        <Input
                          id="area-terreno"
                          type="text"
                          className="max-w-none"
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
                  name="testada"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="testada">Testada principal*</FormLabel>
                      <FormControl>
                        <Input
                          id="testada"
                          type="text"
                          className="max-w-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="flex items-start gap-6 max-md:flex-col">
              <div className="w-full md:w-1/2">
                <FormField
                  control={form.control}
                  name="fracao"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="fracao">Fração ideal</FormLabel>
                      <FormControl>
                        <Input
                          id="fracao"
                          type="text"
                          className="max-w-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="w-full md:w-2/5">
                <FormField
                  control={form.control}
                  name="data_inclusao"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="data-inclusao">Data de inclusão*</FormLabel>
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
                            initialFocus
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
          </div>
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

          <FormField
            control={form.control}
            name="observacao"
            render={({ field }) => (
              <FormItem className="mt-6">
                <FormControl>
                  <Textarea
                    id="data-inclusao"
                    rows={8}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </fieldset>

        <div className="flex justify-end gap-4">
          <Button variant="secondary" onClick={onHandleBack}>Voltar</Button>
          <Button type="submit">Finalizar</Button>
        </div>
      </form>
    </Form>
  )
}
