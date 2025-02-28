"use client";

import { usePathname, useRouter } from "next/navigation";
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
import { Loader } from "@/components/loader";
import { editarImovel } from "@/service/imovelService";
import ICadastroImovel from "@/interfaces/ICadastroImovel";
import { motion } from "motion/react";
import ITipoDocumento from "@/interfaces/ITipoDocumento";
import { cadastrarDocumentos } from "@/service/documentoService";
import IFicha from "@/interfaces/Analista/IFicha";

interface FormCadastroDocumentosProps {
  ficha: IFicha;
  documentos: ITipoDocumento[];
}

type FileData = {
  nomeTemporario: string;
  nomeOriginal: string;
  dataEnvio: string;
};

export function FormCadastroDocumentos({
  ficha,
  documentos,
}: FormCadastroDocumentosProps) {
  const router = useRouter();
  const pathname = usePathname();
  const municipio = pathname.split("/")[1];

  const [files, setFiles] = useState<Record<number, FileData | undefined>>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingContinuarDepois, setLoadingContinuarDepois] =
    useState<boolean>(false);

  const { toast } = useToast();
  const { formData } = useFormState();

  const form = useForm<documentosFormData>({
    resolver: zodResolver(documentosFormSchema),
  });

  const { setValue, trigger } = form;

  // TODO: listar documentos enviados
  // useEffect(() => {
  //   if (ficha?.documentosEnviados) {
  //     ficha.documentosEnviados.forEach((documento, index) => {

  //     });

  //     trigger();
  //   }
  // }, [ficha, setValue]);

  const onSubmit: SubmitHandler<documentosFormData> = async (data: any) => {
    try {
      setLoading(true);

      const sendData: ICadastroImovel = {
        idGrupo: data.idGrupo,
        imovel: {
          representantes: data.representantes,
          informacaoImovel: data.informacaoImovel,
          caracterizacaoImovel: data.caracterizacaoImovel,
          georreferenciamento: data.georreferenciamento,
        },
      };

      await editarImovel(ficha.processo.id, sendData);

      const processoId = ficha.processo.id;

      toast({ description: "Imóvel editado com sucesso!" });
      setValue("idProcesso", processoId);

      await cadastrarDocumentos({
        idProcesso: processoId,
        documentos: data.documentos,
      });

      toast({ description: "Documentos enviados com sucesso!" });

      router.push(`/${municipio}/imoveis/ficha/${processoId}`);
    } catch (error: any) {
      toast({
        title: error.response?.data?.messageTitle || "Erro ao enviar",
        description: error.response?.data?.message || "Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const onSubmitContinuarDepois = async (data: any) => {
    try {
      setLoadingContinuarDepois(true);

      const sendData: ICadastroImovel = {
        idGrupo: data.idGrupo,
        imovel: {
          representantes: data.representantes,
          informacaoImovel: data.informacaoImovel,
          caracterizacaoImovel: data.caracterizacaoImovel,
          georreferenciamento: data.georreferenciamento,
        },
      };

      const processoId = ficha.processo.id;

      await editarImovel(processoId, sendData);

      toast({ description: "Imóvel editado com sucesso!" });

      router.push(`/${municipio}/imoveis/ficha/${processoId}`);
    } catch (error: any) {
      toast({
        title: error.response?.data?.messageTitle || "Erro ao enviar",
        description: error.response?.data?.message || "Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setLoadingContinuarDepois(false);
    }
  };

  return (
    <Form {...form}>
      <motion.div
        initial={{ y: -50, opacity: 0 }}
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
            <div className="flex items-center justify-between space-y-1 flex-wrap gap-4">
              <h2 className="text-xl font-medium">Enviar documentos</h2>
              <p>Anexe os documentos no campo abaixo.</p>
            </div>

            {documentos.map((documento, index) => {
              const accept = documento.formatos.join(",");

              setValue(`documentos.${index}.idTipoDocumento`, index);
              setValue(
                `documentos.${index}.obrigatorio`,
                documento.obrigatorio
              );
              setValue(`documentos.${index}.formatos`, documento.formatos);

              return (
                <div key={documento.id} className="space-y-3">
                  <span className="font-bold block">
                    {documento.titulo}
                    {documento.obrigatorio && "*"}
                  </span>

                  <FormField
                    control={form.control}
                    name={`documentos.${index}.file`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="w-full rounded bg-[#FBFBFB] hover:bg-muted/50 border border-input p-6 cursor-pointer transition-colors text-base">
                          <div className="flex items-center justify-between gap-4 w-full flex-wrap">
                            {files[index]?.nomeOriginal ? (
                              <span className="text-primary underline font-bold">
                                {files[index]?.nomeOriginal}
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
                                const file = e.target.files?.[0];
                                if (file) {
                                  const extensao = `.${file.name
                                    .split(".")
                                    .pop()
                                    ?.toLowerCase()}`;

                                  if (!documento.formatos.includes(extensao)) {
                                    form.setError(`documentos.${index}.file`, {
                                      type: "manual",
                                      message: "Formato de arquivo inválido",
                                    });
                                    return;
                                  }

                                  const fileData: FileData = {
                                    nomeTemporario:
                                      file.name.replace(/\s+/g, "_") +
                                      "_" +
                                      Date.now(),
                                    nomeOriginal: file.name,
                                    dataEnvio: new Date().toISOString(),
                                  };

                                  setFiles((prev) => ({
                                    ...prev,
                                    [index]: fileData,
                                  }));

                                  field.onChange(fileData.nomeOriginal);

                                  setValue(
                                    `documentos.${index}.nomeTemporario`,
                                    fileData.nomeTemporario
                                  );
                                  setValue(
                                    `documentos.${index}.nomeOriginal`,
                                    fileData.nomeOriginal
                                  );
                                  setValue(
                                    `documentos.${index}.dataEnvio`,
                                    fileData.dataEnvio
                                  );
                                }
                              }}
                              ref={field.ref}
                              className="hidden"
                            />
                          </FormControl>
                        </FormLabel>

                        {!files[index]?.nomeOriginal && <FormMessage />}
                      </FormItem>
                    )}
                  />
                </div>
              );
            })}
          </div>

          <div className="flex justify-between items-center flex-col md:flex-row flex-wrap gap-4 mt-6">
            <Button
              type="button"
              onClick={async () =>
                await handlePreviousStep(municipio, ficha.processo.id)
              }
              variant="secondary"
              className="w-full md:w-fit mr-auto"
            >
              Voltar
            </Button>

            <Button
              type="button"
              variant="secondary"
              onClick={async () => await onSubmitContinuarDepois(formData)}
              className={`w-full md:w-60${
                loadingContinuarDepois ? " pointer-events-none" : ""
              }`}
            >
              {loadingContinuarDepois ? <Loader /> : "Continuar depois"}
            </Button>

            <Button
              type="submit"
              className={`w-full md:w-fit${
                loading ? " pointer-events-none" : ""
              }`}
            >
              {loading ? <Loader /> : "Finalizar"}
            </Button>
          </div>
        </form>
      </motion.div>
    </Form>
  );
}
