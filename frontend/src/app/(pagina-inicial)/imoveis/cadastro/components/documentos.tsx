'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, SubmitHandler } from "react-hook-form";

import { useFormState } from "@/contexts/Imovel/FormContext";

import { documentosFormSchema, documentosFormData } from "@/validation/documentos"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";

export function CadastroDocumentos() {
  const { onHandleBack, onHandleNext, formData, setFormData } = useFormState();

  const form = useForm<documentosFormData>({
    resolver: zodResolver(documentosFormSchema),
    defaultValues: formData
  })

  const onSubmit: SubmitHandler<documentosFormData> = (data) => {
    console.log(data)
    setFormData((prev: any) => ({ ...prev, ...data }))
    onHandleNext()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} encType="multipart/form-data">
        <div className="bg-white border border-[#E8E1E1] rounded-2xl p-6">
          <header className="flex items-center justify-between mb-1">
            <h2 className="text-xl">Enviar documentos</h2>
            <span className="max-md:hidden">*itens obrigatórios</span>
          </header>

          <p>Anexe os documentos no campo abaixo. Os arquivos aceitos são  shape, dwg, kml e PDF.</p>

          <div className="mt-6 space-y-6">
            <FormField
              control={form.control}
              name="habitese"
              render={({ field }) => (
                <FormItem>
                  <span className="font-bold">Habite-se do imóvel*</span>
                  <FormControl>
                    <FormLabel
                      htmlFor="habitese"
                      className="flex items-center rounded bg-[#FBFBFB] hover:bg-muted/50 border border-[#E8E1E1] p-6 cursor-pointer transition-colors text-base"
                    >
                      {field.value?.[0].name && (
                        <span className="text-primary underline font-bold">{field.value?.[0].name}</span>
                      )}
                      <Input
                        id="habitese"
                        type="file"
                        accept=".shp,.shp, .dwg,.kml,.pdf"
                        name={field.name}
                        onBlur={field.onBlur}
                        onChange={(e) => {
                          field.onChange(e.target.files);
                        }}
                        ref={field.ref}
                        className="sr-only"
                      />
                      <Download className="ml-auto" />
                    </FormLabel>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="matricula"
              render={({ field }) => (
                <FormItem>
                  <span className="font-bold">Matrícula*</span>
                  <FormControl>
                    <FormLabel
                      htmlFor="matricula"
                      className="flex items-center rounded bg-[#FBFBFB] hover:bg-muted/50 border border-[#E8E1E1] p-6 cursor-pointer transition-colors text-base"
                    >
                      {field.value?.[0].name && (
                        <span className="text-primary underline font-bold">{field.value?.[0].name}</span>
                      )}
                      <Input
                        id="matricula"
                        type="file"
                        accept=".shp,.shp, .dwg,.kml,.pdf"
                        name={field.name}
                        onBlur={field.onBlur}
                        onChange={(e) => {
                          field.onChange(e.target.files);
                        }}
                        ref={field.ref}
                        className="sr-only"
                      />
                      <Download className="ml-auto" />
                    </FormLabel>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="documento"
              render={({ field }) => (
                <FormItem>
                  <span className="font-bold">Documento do proprietário (comprima em um arquivo .ZIP)*</span>
                  <FormControl>
                    <FormLabel
                      htmlFor="documento"
                      className="flex items-center rounded bg-[#FBFBFB] hover:bg-muted/50 border border-[#E8E1E1] p-6 cursor-pointer transition-colors text-base"
                    >
                      {field.value?.[0].name && (
                        <span className="text-primary underline font-bold">{field.value?.[0].name}</span>
                      )}
                      <Input
                        id="documento"
                        type="file"
                        accept=".zip"
                        name={field.name}
                        onBlur={field.onBlur}
                        onChange={(e) => {
                          field.onChange(e.target.files);
                        }}
                        ref={field.ref}
                        className="sr-only"
                      />
                      <Download className="ml-auto" />
                    </FormLabel>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="outros"
              render={({ field }) => (
                <FormItem className="space-y-4 border-t border-t-[#D9D9D9] pt-4">
                  <div className="flex items-center justify-between">
                    <span className="font-bold">Outros documentos</span>
                    <FormControl>
                      <Button
                        variant="secondary"
                        asChild
                        className="cursor-pointer"
                      >
                        <FormLabel htmlFor="outros">
                          <Input
                            id="outros"
                            type="file"
                            accept=".shp,.dwg,.kml,.pdf"
                            name={field.name}
                            onBlur={field.onBlur}
                            onChange={(e) => {
                              field.onChange(e.target.files);
                            }}
                            ref={field.ref}
                            multiple
                            className="sr-only"
                          />
                          anexar arquivo
                        </FormLabel>
                      </Button>
                    </FormControl>
                    <FormMessage />
                  </div>

                  {field.value && Object.keys(field.value).map(fileName => (
                    <div
                      key={fileName}
                      className="flex items-center rounded bg-[#FBFBFB] hover:bg-muted/50 border border-[#E8E1E1] p-6 cursor-pointer transition-colors text-base w-full mb-6"
                    >
                      <span className="text-primary underline font-bold">{field.value?.[0].name}</span>
                      <Download className="ml-auto" />
                    </div>
                  ))}
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <Button variant="secondary" onClick={onHandleBack}>Voltar</Button>
          <Button type="submit">Avançar</Button>
        </div>
      </form>
    </Form >
  )
}