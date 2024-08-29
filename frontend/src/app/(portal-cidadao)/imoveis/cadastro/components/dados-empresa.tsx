import { useFormContext } from "react-hook-form"
import { dadosEmpresaData } from "@/validation/imovel/representante"
import { ufOptions, convertUFToState } from "@/validation/estados";
import { formatarCampo, consultarCep } from "@/lib/utils";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { Info as LucideInfo } from "lucide-react";

export function DadosEmpresa() {
  const { control, setValue } = useFormContext<dadosEmpresaData>()

  async function handleChangeCEP(e: React.ChangeEvent<HTMLInputElement>): Promise<any> {
    const rawValue = e.target.value
    const formattedValue = formatarCampo(rawValue, 'CEP')

    setValue('cep_empresa', formattedValue)

    if (formattedValue.length === 9) {
      try {
        const response = await consultarCep(formattedValue)

        if (response.erro) {
          return
        }

        setValue('endereco_empresa', response.logradouro)
        setValue('complemento_empresa', response.complemento)
        setValue('bairro_empresa', response.bairro)
        setValue('cidade_empresa', response.localidade)
        setValue('uf_empresa', response.uf)
      } catch (error) {
        console.error('Erro ao consultar CEP:', error)
      }
    }
  }

  return (
    <fieldset className="bg-white border border-input rounded-2xl p-6 space-y-6">
      <div>
        <h2 className="text-xl font-medium">Informações da empresa</h2>
        <p>Informe todos os dados para continuar o processo de cadastramento de imóvel.</p>
      </div>

      <div className="flex items-start gap-6 flex-col md:flex-row">
        <FormField
          control={control}
          name="razao_social"
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
                <Input type="tel" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="flex items-start gap-6 flex-col md:flex-row">
        <FormField
          control={control}
          name="email_empresa"
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
          name="cep_empresa"
          render={({ field }) => (
            <FormItem className="w-1/5">
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
                <Input type="tel" {...field} onChange={handleChangeCEP} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="endereco_empresa"
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
          name="numero_empresa"
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
          name="complemento_empresa"
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
          name="bairro_empresa"
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
          name="cidade_empresa"
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
          name="uf_empresa"
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
    </fieldset>
  )
}