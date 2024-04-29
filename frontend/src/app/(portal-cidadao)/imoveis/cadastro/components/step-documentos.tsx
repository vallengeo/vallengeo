'use client'

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

import { useFormState } from "@/contexts/Imovel/FormContext";

import { documentosFormData, documentosFormSchema } from "@/validation/imovel/documentos";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
    setFormData((prev: any) => ({ ...prev, ...data }))
    onHandleNext()
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        encType="multipart/form-data"
      >
        <div className="bg-white border border-[#E8E1E1] rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between space-y-1">
            <h2 className="text-xl font-medium">Enviar documentos</h2>
            <p>Anexe os documentos no campo abaixo. Os arquivos aceitos são  shape, dwg, kml e PDF.</p>
          </div>

          <div className="space-y-3">
            <span className="font-bold block">Matrícula*</span>
            <FormField
              control={form.control}
              name="matricula"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <FormLabel className="w-full rounded bg-[#FBFBFB] hover:bg-muted/50 border border-[#E8E1E1] p-6 cursor-pointer transition-colors text-base">
                      <div className="flex items-center justify-between w-full">
                        {field.value?.[0].name ? (
                          <span className="text-primary underline font-bold">{field.value?.[0].name}</span>
                        ) : (
                          <>
                            <span>nenhum documento informado</span>
                            <Button asChild variant="secondary">
                              <span>anexar arquivo</span>
                            </Button>
                          </>
                        )}
                      </div>

                      <Input
                        type="file"
                        accept=".pdf"
                        name={field.name}
                        onBlur={field.onBlur}
                        onChange={(e) => {
                          field.onChange(e.target.files);
                        }}
                        ref={field.ref}
                        className="sr-only"
                      />
                    </FormLabel>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-3">
            <span className="font-bold block">Documento de todos os proprietários*</span>
            <FormField
              control={form.control}
              name="documento_proprietario"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <FormLabel className="w-full rounded bg-[#FBFBFB] hover:bg-muted/50 border border-[#E8E1E1] p-6 cursor-pointer transition-colors text-base">
                      <div className="flex items-center justify-between w-full">
                        {field.value?.[0].name ? (
                          <span className="text-primary underline font-bold">{field.value?.[0].name}</span>
                        ) : (
                          <>
                            <span>nenhum documento informado (RG, CPF ou CNH)</span>
                            <Button asChild variant="secondary">
                              <span>anexar arquivo</span>
                            </Button>
                          </>
                        )}
                      </div>

                      <Input
                        type="file"
                        accept=".pdf"
                        name={field.name}
                        onBlur={field.onBlur}
                        onChange={(e) => {
                          field.onChange(e.target.files);
                        }}
                        ref={field.ref}
                        className="sr-only"
                      />
                    </FormLabel>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="certidao_nascimento_proprietario"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <FormLabel className="w-full rounded bg-[#FBFBFB] hover:bg-muted/50 border border-[#E8E1E1] p-6 cursor-pointer transition-colors text-base">
                      <div className="flex items-center justify-between w-full">
                        {field.value?.[0].name ? (
                          <span className="text-primary underline font-bold">{field.value?.[0].name}</span>
                        ) : (
                          <>
                            <span>nenhum documento informado (Certidão de nascimento)</span>
                            <Button asChild variant="secondary">
                              <span>anexar arquivo</span>
                            </Button>
                          </>
                        )}
                      </div>

                      <Input
                        type="file"
                        accept=".pdf"
                        name={field.name}
                        onBlur={field.onBlur}
                        onChange={(e) => {
                          field.onChange(e.target.files);
                        }}
                        ref={field.ref}
                        className="sr-only"
                      />
                    </FormLabel>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="certidao_casamento_proprietario"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <FormLabel className="w-full rounded bg-[#FBFBFB] hover:bg-muted/50 border border-[#E8E1E1] p-6 cursor-pointer transition-colors text-base">
                      <div className="flex items-center justify-between w-full">
                        {field.value?.[0].name ? (
                          <span className="text-primary underline font-bold">{field.value?.[0].name}</span>
                        ) : (
                          <>
                            <span>nenhum documento informado (Certidão de casamento)</span>
                            <Button asChild variant="secondary">
                              <span>anexar arquivo</span>
                            </Button>
                          </>
                        )}
                      </div>

                      <Input
                        type="file"
                        accept=".pdf"
                        name={field.name}
                        onBlur={field.onBlur}
                        onChange={(e) => {
                          field.onChange(e.target.files);
                        }}
                        ref={field.ref}
                        className="sr-only"
                      />
                    </FormLabel>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="comprovante_residencia_proprietario"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <FormLabel className="w-full rounded bg-[#FBFBFB] hover:bg-muted/50 border border-[#E8E1E1] p-6 cursor-pointer transition-colors text-base">
                      <div className="flex items-center justify-between w-full">
                        {field.value?.[0].name ? (
                          <span className="text-primary underline font-bold">{field.value?.[0].name}</span>
                        ) : (
                          <>
                            <span>nenhum documento informado (Comprovante de residência)</span>
                            <Button asChild variant="secondary">
                              <span>anexar arquivo</span>
                            </Button>
                          </>
                        )}
                      </div>

                      <Input
                        type="file"
                        accept=".pdf"
                        name={field.name}
                        onBlur={field.onBlur}
                        onChange={(e) => {
                          field.onChange(e.target.files);
                        }}
                        ref={field.ref}
                        className="sr-only"
                      />
                    </FormLabel>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-3">
            <span className="font-bold block">Documento de solicitação de aprovação do habite-se*</span>
            <FormField
              control={form.control}
              name="aprovacao_habitese"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <FormLabel className="w-full rounded bg-[#FBFBFB] hover:bg-muted/50 border border-[#E8E1E1] p-6 cursor-pointer transition-colors text-base">
                      <div className="flex items-center justify-between w-full">
                        {field.value?.[0].name ? (
                          <span className="text-primary underline font-bold">{field.value?.[0].name}</span>
                        ) : (
                          <>
                            <span>nenhum documento informado</span>
                            <Button asChild variant="secondary">
                              <span>anexar arquivo</span>
                            </Button>
                          </>
                        )}
                      </div>

                      <Input
                        type="file"
                        accept=".pdf"
                        name={field.name}
                        onBlur={field.onBlur}
                        onChange={(e) => {
                          field.onChange(e.target.files);
                        }}
                        ref={field.ref}
                        className="sr-only"
                      />
                    </FormLabel>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-3">
            <span className="font-bold block">Habite-se do imóvel*</span>
            <FormField
              control={form.control}
              name="habitese_imovel"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <FormLabel className="w-full rounded bg-[#FBFBFB] hover:bg-muted/50 border border-[#E8E1E1] p-6 cursor-pointer transition-colors text-base">
                      <div className="flex items-center justify-between w-full">
                        {field.value?.[0].name ? (
                          <span className="text-primary underline font-bold">{field.value?.[0].name}</span>
                        ) : (
                          <>
                            <span>nenhum documento informado</span>
                            <Button asChild variant="secondary">
                              <span>anexar arquivo</span>
                            </Button>
                          </>
                        )}
                      </div>

                      <Input
                        type="file"
                        accept=".pdf"
                        name={field.name}
                        onBlur={field.onBlur}
                        onChange={(e) => {
                          field.onChange(e.target.files);
                        }}
                        ref={field.ref}
                        className="sr-only"
                      />
                    </FormLabel>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-3">
            <span className="font-bold block">Projeto arquitetonico</span>
            <FormField
              control={form.control}
              name="projeto_arquitetonico"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <FormLabel className="w-full rounded bg-[#FBFBFB] hover:bg-muted/50 border border-[#E8E1E1] p-6 cursor-pointer transition-colors text-base">
                      <div className="flex items-center justify-between w-full">
                        {field.value?.[0].name ? (
                          <span className="text-primary underline font-bold">{field.value?.[0].name}</span>
                        ) : (
                          <>
                            <span>nenhum documento informado</span>
                            <Button asChild variant="secondary">
                              <span>anexar arquivo</span>
                            </Button>
                          </>
                        )}
                      </div>

                      <Input
                        type="file"
                        accept=".pdf"
                        name={field.name}
                        onBlur={field.onBlur}
                        onChange={(e) => {
                          field.onChange(e.target.files);
                        }}
                        ref={field.ref}
                        className="sr-only"
                      />
                    </FormLabel>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-3">
            <span className="font-bold block">Procuração</span>
            <FormField
              control={form.control}
              name="procuracao"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <FormLabel className="w-full rounded bg-[#FBFBFB] hover:bg-muted/50 border border-[#E8E1E1] p-6 cursor-pointer transition-colors text-base">
                      <div className="flex items-center justify-between w-full">
                        {field.value?.[0].name ? (
                          <span className="text-primary underline font-bold">{field.value?.[0].name}</span>
                        ) : (
                          <>
                            <span>nenhum documento informado</span>
                            <Button asChild variant="secondary">
                              <span>anexar arquivo</span>
                            </Button>
                          </>
                        )}
                      </div>

                      <Input
                        type="file"
                        accept=".pdf"
                        name={field.name}
                        onBlur={field.onBlur}
                        onChange={(e) => {
                          field.onChange(e.target.files);
                        }}
                        ref={field.ref}
                        className="sr-only"
                      />
                    </FormLabel>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-3">
            <span className="font-bold block">Documentos responsável legal</span>
            <FormField
              control={form.control}
              name="responsavel_legal"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <FormLabel className="w-full rounded bg-[#FBFBFB] hover:bg-muted/50 border border-[#E8E1E1] p-6 cursor-pointer transition-colors text-base">
                      <div className="flex items-center justify-between w-full">
                        {field.value?.[0].name ? (
                          <span className="text-primary underline font-bold">{field.value?.[0].name}</span>
                        ) : (
                          <>
                            <span>nenhum documento informado</span>
                            <Button asChild variant="secondary">
                              <span>anexar arquivo</span>
                            </Button>
                          </>
                        )}
                      </div>

                      <Input
                        type="file"
                        accept=".pdf"
                        name={field.name}
                        onBlur={field.onBlur}
                        onChange={(e) => {
                          field.onChange(e.target.files);
                        }}
                        ref={field.ref}
                        className="sr-only"
                      />
                    </FormLabel>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-3">
            <span className="font-bold block">IPTU</span>
            <FormField
              control={form.control}
              name="iptu"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <FormLabel className="w-full rounded bg-[#FBFBFB] hover:bg-muted/50 border border-[#E8E1E1] p-6 cursor-pointer transition-colors text-base">
                      <div className="flex items-center justify-between w-full">
                        {field.value?.[0].name ? (
                          <span className="text-primary underline font-bold">{field.value?.[0].name}</span>
                        ) : (
                          <>
                            <span>nenhum documento informado</span>
                            <Button asChild variant="secondary">
                              <span>anexar arquivo</span>
                            </Button>
                          </>
                        )}
                      </div>

                      <Input
                        type="file"
                        accept=".pdf"
                        name={field.name}
                        onBlur={field.onBlur}
                        onChange={(e) => {
                          field.onChange(e.target.files);
                        }}
                        ref={field.ref}
                        className="sr-only"
                      />
                    </FormLabel>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-3">
            <span className="font-bold block">EIV (Estudo de impacto de vizinhança)</span>
            <FormField
              control={form.control}
              name="eiv"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <FormLabel className="w-full rounded bg-[#FBFBFB] hover:bg-muted/50 border border-[#E8E1E1] p-6 cursor-pointer transition-colors text-base">
                      <div className="flex items-center justify-between w-full">
                        {field.value?.[0].name ? (
                          <span className="text-primary underline font-bold">{field.value?.[0].name}</span>
                        ) : (
                          <>
                            <span>nenhum documento informado</span>
                            <Button asChild variant="secondary">
                              <span>anexar arquivo</span>
                            </Button>
                          </>
                        )}
                      </div>

                      <Input
                        type="file"
                        accept=".pdf"
                        name={field.name}
                        onBlur={field.onBlur}
                        onChange={(e) => {
                          field.onChange(e.target.files);
                        }}
                        ref={field.ref}
                        className="sr-only"
                      />
                    </FormLabel>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-3">
            <span className="font-bold block">RIT (Relatório de impacto de trânsito)</span>
            <FormField
              control={form.control}
              name="rit"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <FormLabel className="w-full rounded bg-[#FBFBFB] hover:bg-muted/50 border border-[#E8E1E1] p-6 cursor-pointer transition-colors text-base">
                      <div className="flex items-center justify-between w-full">
                        {field.value?.[0].name ? (
                          <span className="text-primary underline font-bold">{field.value?.[0].name}</span>
                        ) : (
                          <>
                            <span>nenhum documento informado</span>
                            <Button asChild variant="secondary">
                              <span>anexar arquivo</span>
                            </Button>
                          </>
                        )}
                      </div>

                      <Input
                        type="file"
                        accept=".pdf"
                        name={field.name}
                        onBlur={field.onBlur}
                        onChange={(e) => {
                          field.onChange(e.target.files);
                        }}
                        ref={field.ref}
                        className="sr-only"
                      />
                    </FormLabel>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex justify-between items-center flex-wrap gap-4">
          <Button variant="secondary" onClick={onHandleBack}>Voltar</Button>

          <div className="space-x-4">
            <Button variant="secondary">Continuar depois</Button>
            <Button type="submit">Finalizar</Button>
          </div>
        </div>
      </form>
    </Form >
  )
}