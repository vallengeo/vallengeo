'use client';

import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { suporteFormSchema, suporteFormData } from "@/validation/usuario/suporte";
import { formatarCampo } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import { Form } from "@/components/ui/form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useToast } from "./ui/use-toast";

export function FormSuporte() {
  const { toast } = useToast()
  const [openForm, setOpenForm] = useState<boolean>(false);

  const form = useForm<suporteFormData>({
    resolver: zodResolver(suporteFormSchema),
    defaultValues: {
      nome: '',
      email: '',
      telefone: '',
      mensagem: ''
    }
  });

  const onSubmit: SubmitHandler<suporteFormData> = (data) => {
    setOpenForm(false);
    form.reset();

    toast({
      variant: 'default',
      description: 'Dados enviados com sucesso!'
    })

    console.log(data)

    /**
     * TODO: integrar ao back
     */
  }

  function handleChangeTelefone(e: React.ChangeEvent<HTMLInputElement>) {
    const rawValue = e.target.value;
    const formattedValue = formatarCampo(rawValue, 'Telefone');
    form.setValue('telefone', formattedValue);
  }

  return (
    <div className="bg-white rounded-lg fixed left-6 bottom-20 z-20 border border-input w-full max-w-[430px] max-h-[80vh] overflow-y-auto overflow-hidden scrollbar-hide">
      <button
        type="button"
        onClick={() => setOpenForm(!openForm)}
        data-state={openForm ? 'open' : 'closed'}
        className="group sticky top-0 flex items-center justify-between gap-4 w-full bg-[#FCFCFC] py-4 px-6"
      >
        <span className="font-semibold max-w-[250px] text-left">
          Em caso de dúvida, não hesite em entrar em contato.
        </span>
        <ChevronDown className="text-primary group-data-[state=open]:rotate-180" />
      </button>

      {openForm && (
        <div className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-3">
                <FormField
                  control={form.control}
                  name="nome"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-normal">Nome*</FormLabel>
                      <FormControl>
                        <Input type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-normal">E-mail*</FormLabel>
                      <FormControl>
                        <Input type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="telefone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-normal">Telefone*</FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          maxLength={15}
                          {...field}
                          onChange={handleChangeTelefone}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="mensagem"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-normal">Mensagem*</FormLabel>
                      <FormControl>
                        <Textarea rows={3} {...field} className="bg-transparent"></Textarea>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex items-center justify-between">
                <Button
                  type="button"
                  onClick={() => form.reset()}
                  variant="link"
                  className="px-2 text-lg"
                >Limpar</Button>

                <Button type="submit">Entrar</Button>
              </div>
            </form>
          </Form>
        </div>
      )}
    </div>
  )
}
