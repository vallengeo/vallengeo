import { useFormContext } from "react-hook-form";
import { consultarCep, formatarCampo } from "@/lib/utils";
import { ufOptions, convertUFToState } from "@/validation/estados";
import { dadosPessoaisData } from "@/validation/imovel/representante";

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

export function DadosPessoais() {
  const { control, setValue } = useFormContext<dadosPessoaisData>()

  function handleChangeCPF(e: React.ChangeEvent<HTMLInputElement>): void {
    const rawValue = e.target.value;
    const formattedValue = formatarCampo(rawValue, 'CPF')

    setValue('cpf', formattedValue)
  }

  function handleChangeRG(e: React.ChangeEvent<HTMLInputElement>): void {
    const rawValue = e.target.value
    const formattedValue = formatarCampo(rawValue, 'RG')

    setValue('rg', formattedValue)
  }

  async function handleChangeCEP(e: React.ChangeEvent<HTMLInputElement>): Promise<any> {
    const rawValue = e.target.value
    const formattedValue = formatarCampo(rawValue, 'CEP')

    setValue('cep', formattedValue)

    if (formattedValue.length === 9) {
      try {
        const response = await consultarCep(formattedValue)

        if (response.erro) {
          return
        }

        setValue('endereco', response.logradouro)
        setValue('complemento', response.complemento)
        setValue('bairro', response.bairro)
        setValue('cidade', response.localidade)
        setValue('uf', response.uf)
      } catch (error) {
        console.error('Erro ao consultar CEP:', error)
      }
    }
  }

  function handleChangeTelefone(e: React.ChangeEvent<HTMLInputElement>): void {
    const rawValue = e.target.value;
    const formattedValue = formatarCampo(rawValue, 'Telefone');
    setValue('telefone', formattedValue);
  };

  return (
    <>
      <div>
        <h2 className="text-xl font-medium">Representante do imóvel - Proprietário(a)</h2>
        <p>Informe todos os dados para iniciar o processo de cadastramento de imóvel.</p>
      </div>

      <div className="flex items-start gap-6 flex-col md:flex-row">
        <FormField
          control={control}
          name="nome"
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
          name="cpf"
          render={({ field }) => (
            <FormItem className="w-full md:w-1/5">
              <FormLabel>CPF*</FormLabel>
              <FormControl>
                <Input type="text" maxLength={14} {...field} onChange={handleChangeCPF} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="rg"
          render={({ field }) => (
            <FormItem className="w-full md:w-1/5">
              <FormLabel>RG*</FormLabel>
              <FormControl>
                <Input type="text" maxLength={10} {...field} onChange={handleChangeRG} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="telefone"
          render={({ field }) => (
            <FormItem className="w-full md:w-1/4">
              <FormLabel>Telefone*</FormLabel>
              <FormControl>
                <Input type="text" maxLength={15} {...field} onChange={handleChangeTelefone} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="flex items-start gap-6 flex-col md:flex-row">
        <FormField
          control={control}
          name="email"
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
          name="cep"
          render={({ field }) => (
            <FormItem className="w-full md:w-1/5">
              <FormLabel>CEP*</FormLabel>
              <FormControl>
                <Input type="text" maxLength={9} {...field} onChange={handleChangeCEP} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="endereco"
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
          name="numero"
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
          name="complemento"
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
          name="bairro"
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
          name="cidade"
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
          name="uf"
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
    </>
  )
}
