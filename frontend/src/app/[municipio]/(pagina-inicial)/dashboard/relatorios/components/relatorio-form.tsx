"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { relatoriosSchema, relatoriosData } from "@/validation/relatorios";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import IRelatorioFiltro from "@/interfaces/Analista/IRelatorioFiltro";
import { downloadRelatorio } from "@/service/analista/analistaService";
import IRelatorioDownload from "@/interfaces/Analista/IRelatorioDownload";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { Loader } from "@/components/loader";

interface RelatorioFormProps {
  data: IRelatorioFiltro;
}

export function RelatorioForm({ data }: RelatorioFormProps) {
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<relatoriosData>({
    resolver: zodResolver(relatoriosSchema),
    defaultValues: {
      items: [],
    },
  });

  const onSubmit: SubmitHandler<relatoriosData> = (data) => {
    try {
      const relatorio: IRelatorioDownload = {
        filtros: data.items,
      };

      setIsLoading(true);

      downloadRelatorio(relatorio)
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          toast({
            variant: "destructive",
            title: error.response.data.messageTitle,
            description: error.response.data.message,
          });
        })
        .finally(() => {
          setIsLoading(false);
        });
    } catch (error) {
      console.error("Ocorreu um erro ao gerar o relatório:", error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="bg-white border border-input rounded-3xl p-6">
        <header className="max-w-[370px]">
          <h2 className="text-xl">
            Realize a seleção de filtros para encontrar o seu relatório
          </h2>
        </header>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 mt-6 mb-5"
          >
            <FormField
              control={form.control}
              name="items"
              render={({ field }) => (
                <FormItem className="flex items-center flex-wrap gap-x-4 gap-y-5 max-w-[550px] space-y-0">
                  {Object.entries(data).map(([key, value]) => (
                    <FormItem
                      key={key}
                      className="flex flex-row items-center space-x-3 space-y-0"
                    >
                      <FormControl>
                        <Checkbox
                          checked={field.value.includes(key)}
                          onCheckedChange={(checked) => {
                            const updatedValue = checked
                              ? [...field.value, key]
                              : field.value.filter((item) => item !== key);
                            field.onChange(updatedValue);
                          }}
                        />
                      </FormControl>
                      <FormLabel className="font-normal text-base">
                        {value}
                      </FormLabel>
                    </FormItem>
                  ))}
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="text-right">
              <Button
                type="submit"
                variant="default"
                className={`h-12 w-full sm:w-52 ${
                  isLoading ? "pointer-events-none" : ""
                }`}
              >
                {isLoading ? <Loader /> : "Gerar relatório"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
}
