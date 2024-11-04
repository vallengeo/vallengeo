import { useFormContext } from "react-hook-form"
import { dadosEmpresaData } from "@/validation/imovel/representante"
import { getCep } from "@/service/localidadeService"
import { ufOptions, convertUFToState } from "@/validation/estados";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import InputMask from "react-input-mask";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export function DadosEmpresa() {
  const { toast } = useToast();
  const { control, setValue } = useFormContext<dadosEmpresaData>()

  const consultarCep = async (value: string) => {
    try {
      const cep = value.replace(/\D/g, '');
      if (cep.length <= 7) {
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

      setValue('endereco_empresa', logradouro);
      setValue('complemento_empresa', complemento);
      setValue('bairro_empresa', bairro);
      setValue('cidade_empresa', municipio.estado.nome);
      setValue('uf_empresa', municipio.estado.uf);
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message;

      toast({
        'description': errorMessage,
        'variant': 'destructive',
      });
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
                <InputMask
                  mask="99.999.999/9999-99"
                  value={field.value}
                  onChange={field.onChange}
                >
                  {(inputProps: InputProps) => <Input type="tel" {...inputProps} />}
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
              <FormLabel className="leading-6">CEP*</FormLabel>
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
