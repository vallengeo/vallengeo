'use client'

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useFormState } from "@/contexts/Imovel/FormContext";
import { documentosFormData, documentosFormSchema } from "@/validation/imovel/documentos";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { tipoDocumento } from "@/service/documentoService";
import ITipoDocumento from "@/interfaces/ITipoDocumento";

export function CadastroDocumentos() {
  const [files, setFiles] = useState<Record<number, File | undefined>>({});
  const [documentos, setDocumentos] = useState<ITipoDocumento[]>([]);
  const { toast } = useToast()

  const { onHandleBack, formData, setFormData } = useFormState();

  const form = useForm<documentosFormData>({
    resolver: zodResolver(documentosFormSchema),
  })

  const onSubmit: SubmitHandler<documentosFormData> = (data) => {
    setFormData((prev: any) => ({ ...prev, ...data }))
    console.log(formData)

    toast({
      description: 'Dados enviados com sucesso!',
    })
  }

  useEffect(() => {
    const documentos = async () => {
      const response = await tipoDocumento();
      setDocumentos(response.data);
    };

    documentos();
  }, [])

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        encType="multipart/form-data"
      >
        <div className="bg-white border border-input rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between space-y-1">
            <h2 className="text-xl font-medium">Enviar documentos</h2>
            <p>Anexe os documentos no campo abaixo. Os arquivos aceitos são  shape, dwg, kml e PDF.</p>
          </div>

          {documentos && documentos.map((documento, index) => {
            const accept = documento.formatos.join(",");

            return (
              <div key={documento.id} className="space-y-3">
                <span className="font-bold block">
                  {documento.titulo}{documento.obrigatorio && '*'}
                </span>

                <FormField
                  control={form.control}
                  name={`documentos.${index}.idTipoDocumento`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="w-full rounded bg-[#FBFBFB] hover:bg-muted/50 border border-input p-6 cursor-pointer transition-colors text-base">
                        <div className="flex items-center justify-between w-full">
                          {files[index]?.name ? (
                            <span className="text-primary underline font-bold">{files[index]?.name}</span>
                          ) : (
                            <>
                              <span>nenhum documento informado</span>
                              <Button asChild variant="secondary">
                                <span>anexar arquivo</span>
                              </Button>
                            </>
                          )}
                        </div>

                        <FormControl>
                          <Input
                            type="file"
                            accept={accept}
                            name={field.name}
                            onBlur={field.onBlur}
                            onChange={(e) => {
                              const file = e.target.files ? e.target.files[0] : undefined;
                              setFiles(prev => ({ ...prev, [index]: file }));
                              field.onChange(file ? file.name : "");
                            }}
                            ref={field.ref}
                            className="hidden"
                          />
                        </FormControl>
                      </FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            );
          })}
        </div>

        <div className="flex justify-between items-center flex-wrap gap-4 mt-6">
          <Button
            type="button"
            variant="secondary"
            onClick={onHandleBack}
          >
            Voltar
          </Button>

          <div className="space-x-4">
            <Button type="button" variant="secondary">Continuar depois</Button>
            <Button type="submit">Finalizar</Button>
          </div>
        </div>
      </form>
    </Form >
  )
}
