import { useFormContext } from "react-hook-form";
import { contatoData } from "@/validation/imovel/representante";
import { useFormState } from "@/contexts/Imovel/FormContext"

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import {
  RadioGroup,
  RadioGroupItem
} from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input"
import { Aviso } from "./aviso";

export function Contato() {
  const { control } = useFormContext<contatoData>()
  const { contato, setContato } = useFormState()

  return (
    <div className="bg-white border border-[#E8E1E1] rounded-2xl p-6">
      <fieldset>
        <legend className="sr-only">Informação de contato</legend>

        <div className="flex items-center flex-wrap gap-4">
          <h2 className="text-xl font-semibold">Informação de contato:</h2>

          <FormField
            control={control}
            name="tipo_contato"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <RadioGroup
                    onValueChange={(value) => {
                      if (value === 'representante' || value === 'responsavel' || value === 'outro') {
                        setContato(value);
                        field.onChange(value);
                      }
                    }}
                    className="flex items-center flex-wrap gap-4"
                    {...field}
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

        {contato !== 'representante' && (
          <div>
            <Aviso
              type="warning"
              size={24}
              message="Na seção de documentos, é imprescindível anexar a procuração, podendo esta ser simples ou autenticada."
              className="bg-[#E0E0FF] justify-start my-6"
            />

            <div className="flex items-start gap-6 flex:col md:flex-row">
              <FormField
                control={control}
                name="nome_contato"
                render={({ field }) => (
                  <FormItem className="w-full md:w-1/5">
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
                name="email_contato"
                render={({ field }) => (
                  <FormItem className="w-full md:w-1/5">
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
                name="telefone_contato"
                render={({ field }) => (
                  <FormItem className="w-full md:w-1/5">
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
                name="cnpj_contato"
                render={({ field }) => (
                  <FormItem className="w-full md:w-1/5">
                    <FormLabel>CNPJ*</FormLabel>
                    <FormControl>
                      <Input type="tel" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="cpf_contato"
                render={({ field }) => (
                  <FormItem className="w-full md:w-1/5">
                    <FormLabel>CPF*</FormLabel>
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
      </fieldset>
    </div>
  )
}
