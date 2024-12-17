"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useFormState } from "@/contexts/formCadastroPFContext";
import {
  documentosFormData,
  documentosFormSchema,
} from "@/validation/imovel/documentos";
import { handlePreviousStep } from "./navigate";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { tipoDocumento } from "@/service/documentoService";
import ITipoDocumento from "@/interfaces/ITipoDocumento";
import { Loader } from "@/components/loader";
import { cadastro } from "@/service/imovelService";
import ICadastroImovel from "@/interfaces/ICadastroImovel";
import { motion } from "motion/react";

export function FormCadastroDocumentos() {
  const pathname = usePathname();
  const municipio = pathname.split("/")[1];

  const [files, setFiles] = useState<Record<number, File | undefined>>({});
  const [documentos, setDocumentos] = useState<ITipoDocumento[]>([]);
  const [loadingContinuarDepois, setLoadingContinuarDepois] =
    useState<boolean>(false);

  const { toast } = useToast();
  const { formData, setFormData } = useFormState();

  const form = useForm<documentosFormData>({
    resolver: zodResolver(documentosFormSchema),
  });

  const onSubmit: SubmitHandler<documentosFormData> = (data) => {
    setFormData((prev: any) => ({ ...prev, ...data }));
    console.log(formData);

    toast({
      description: "Dados enviados com sucesso!",
    });
  };

  const onSubmitContinuarDepois = async (data: any) => {
    setLoadingContinuarDepois(true);

    const sendData: ICadastroImovel = {
      idGrupo: data.idGrupo,
      imovel: {
        representantes: [...data.representantes],
        informacaoImovel: {
          ...data.informacaoImovel,
        },
        caracterizacaoImovel: {
          ...data.caracterizacaoImovel,
        },
        // TODO - verificar dados validos
        georreferenciamento: {
          geoJson: {
            geometry: {
              coordinates: [
                [
                  [-44.96611868173562, -22.559061809666048],
                  [-44.966143985139496, -22.55902409240122],
                  [-44.96592970837085, -22.558902617586],
                  [-44.96590601936282, -22.558941882174288],
                  [-44.96611868173562, -22.559061809666048],
                ],
              ],
              type: "Polygon",
            },
            type: "Feature",
            properties: {},
          },
        },
      },
    };

    try {
      const response = await cadastro(sendData);

      console.log(response);

      toast({
        description: "Dados enviados com sucesso!",
      });
    } catch (error: any) {
      setLoadingContinuarDepois(false);

      toast({
        description: error.message,
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    const documentos = async () => {
      const response = await tipoDocumento();
      setDocumentos(response.data);
    };

    documentos();
  }, []);

  return (
    <Form {...form}>
      <motion.div
        initial={{ y: -50, opacity: 0 }} //
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.5,
          ease: "easeOut",
        }}
      >
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          encType="multipart/form-data"
        >
          <div className="bg-white border border-input rounded-2xl p-6 space-y-6">
            <div className="flex items-center justify-between space-y-1">
              <h2 className="text-xl font-medium">Enviar documentos</h2>
              <p>
                Anexe os documentos no campo abaixo. Os arquivos aceitos são
                shape, dwg, kml e PDF.
              </p>
            </div>

            {documentos &&
              documentos.map((documento, index) => {
                const accept = documento.formatos.join(",");

                return (
                  <div key={documento.id} className="space-y-3">
                    <span className="font-bold block">
                      {documento.titulo}
                      {documento.obrigatorio && "*"}
                    </span>

                    <FormField
                      control={form.control}
                      name={`documentos.${index}.idTipoDocumento`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="w-full rounded bg-[#FBFBFB] hover:bg-muted/50 border border-input p-6 cursor-pointer transition-colors text-base">
                            <div className="flex items-center justify-between w-full">
                              {files[index]?.name ? (
                                <span className="text-primary underline font-bold">
                                  {files[index]?.name}
                                </span>
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
                                  const file = e.target.files
                                    ? e.target.files[0]
                                    : undefined;
                                  setFiles((prev) => ({
                                    ...prev,
                                    [index]: file,
                                  }));
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
              onClick={async () => await handlePreviousStep(municipio)}
              variant="secondary"
            >
              Voltar
            </Button>

            <div className="space-x-4">
              <Button
                type="button"
                variant="secondary"
                onClick={async () => await onSubmitContinuarDepois(formData)}
              >
                {loadingContinuarDepois ? <Loader /> : "Continuar depois"}
              </Button>

              <Button type="submit">Finalizar</Button>
            </div>
          </div>
        </form>
      </motion.div>
    </Form>
  );
}
