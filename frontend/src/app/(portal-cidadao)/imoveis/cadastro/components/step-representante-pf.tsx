import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  representantePFSchema,
  representantePFData
} from "@/validation/imovel/representante";
import { useFormState } from "@/contexts/Imovel/FormContext";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Aviso } from "./aviso";
import { DadosPessoais } from "./dados-pessoais";
import { Contato } from "./contato";
import { VincularNovoRepresentante } from "./vincular-novo-representante";

export function CadastroRepresentantePF() {
  const { onHandleNext, setFormData, formData } = useFormState()

  const form = useForm<representantePFData>({
    resolver: zodResolver(representantePFSchema),
    defaultValues: formData
  })

  const onSubmit: SubmitHandler<representantePFData> = (data) => {
    console.log(data)
    setFormData((prev: any) => ({ ...prev, ...data }));
    onHandleNext()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <fieldset className="bg-white border border-[#E8E1E1] rounded-2xl py-6 space-y-6 [&>div]:px-6">
          <DadosPessoais />
          <VincularNovoRepresentante />
        </fieldset>

        <Contato />

        <Aviso
          type="info"
          size={36}
          message="Para continuar declarando o imóvel, é necessário inserir pelo menos um representante e informar o contato responsável."
        />

        <div className="flex justify-end mt-6">
          <Button type="submit">Avançar</Button>
        </div>
      </form>
    </Form>
  )
}
