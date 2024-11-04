'use client'

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { dadosPessoaisSchema, dadosPessoaisData } from "@/validation/imovel/representante";
import { useFormState } from "@/contexts/Imovel/FormContext";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { CadastroRepresentantes } from "./step-representantes";

export function CadastroRepresentantePF() {
  const { onHandleNext, setFormData, formData } = useFormState()

  const form = useForm<dadosPessoaisData>({
    mode: 'all',
    criteriaMode: 'all',
    resolver: zodResolver(dadosPessoaisSchema),
    defaultValues: formData,
  })

  const { formState: { isValid } } = form

  const onSubmit: SubmitHandler<dadosPessoaisData> = (data) => {
    console.log(data)
    setFormData((prev: any) => ({ ...prev, ...data }));
    onHandleNext()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-6">
          <CadastroRepresentantes />
        </div>

        <div className="flex justify-end mt-6">
          <Button type="submit" disabled={!isValid}>Avançar</Button>
        </div>
      </form>
    </Form>
  )
}
