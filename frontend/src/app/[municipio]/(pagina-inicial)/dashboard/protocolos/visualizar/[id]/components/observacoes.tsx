"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { observacaoProtocolo } from "@/service/analista/analistaService";
import {
  observacaoData,
  observacaoSchema,
} from "@/validation/analista/observacao";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusCircle } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader } from "@/components/loader";
import { Button } from "@/components/ui/button";

interface ObservacoesProps {
  idProcesso: string;
}

export function Observacoes({ idProcesso }: ObservacoesProps) {
  const { toast } = useToast();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<observacaoData>({
    resolver: zodResolver(observacaoSchema),
    defaultValues: {
      titulo: "",
      descricao: "",
      idProcesso: idProcesso,
    },
  });

  const onSubmit: SubmitHandler<observacaoData> = async (data) => {
    setIsLoading(true);

    await observacaoProtocolo(data)
      .then(() => {
        toast({
          description: "Observação adicionado com sucesso",
        });

        form.reset();
        router.refresh();
      })
      .catch((error) => {
        console.error("Ocorreu um erro ao adicionar uma observação:", error);
        toast({
          variant: "destructive",
          title: error.response.data.messageTitle,
          description: error.response.data.message,
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="grid grid-rows-[0fr_1fr] bg-white border border-input rounded-3xl p-6 flex-1 max-w-[440px]">
      <h2 className="text-lg font-bold mb-4">Observações</h2>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="titulo"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Assunto</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full bg-[#EFEFEF]">
                      <SelectValue placeholder="Selecione o tipo de assunto" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Localização errada">
                        Localização errada
                      </SelectItem>
                      <SelectItem value="Documentos faltantes">
                        Documentos faltantes
                      </SelectItem>
                      <SelectItem value="Informações pendentes">
                        Informações pendentes
                      </SelectItem>
                      <SelectItem value="Outros">Outros</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-rows-[1fr_0fr] gap-2 border border-input bg-[#EFEFEF] rounded-2xl pt-4 px-4 pb-2 h-full">
            <FormField
              control={form.control}
              name="descricao"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">Descrição</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      className="border-0 bg-transparent resize-none [field-sizing:content] min-h-fit"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="text-right">
              <Button
                type="submit"
                variant="no-style"
                size="no-style"
                className={`inline-flex items-center justify-center gap-1 w-24 ${
                  isLoading ? "pointer-events-none" : ""
                }`}
              >
                {isLoading ? (
                  <Loader />
                ) : (
                  <>
                    Adicionar
                    <PlusCircle size={28} strokeWidth={1} />
                  </>
                )}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
