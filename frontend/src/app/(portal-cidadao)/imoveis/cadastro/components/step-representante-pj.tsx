import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

import { useFormState } from "@/contexts/Imovel/FormContext";

import {
  representantePJSchema,
  representantePJData
} from "@/validation/imovel/representante";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Contato } from "./contato";
import { DadosPessoais } from "./dados-pessoais";
import { DadosEmpresa } from "./dados-empresa";

export function CadastroRepresentantePJ() {
  const { onHandleNext, setFormData, formData } = useFormState()

  const form = useForm<representantePJData>({
    resolver: zodResolver(representantePJSchema),
    defaultValues: formData
  })

  const onSubmit: SubmitHandler<representantePJData> = (data) => {
    setFormData((prev: any) => ({ ...prev, ...data }));
    onHandleNext()
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <DadosPessoais />
        <DadosEmpresa />
        <Contato />

        <div className="flex justify-end mt-6">
          <Button type="submit">Avançar</Button>
        </div>
      </form>
    </Form>
  )
}
