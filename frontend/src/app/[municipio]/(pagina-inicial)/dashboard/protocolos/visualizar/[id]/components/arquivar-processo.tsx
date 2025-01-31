"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SubmitHandler, useForm } from "react-hook-form";
import { arquivarData, arquivarSchema } from "@/validation/analista/arquivar";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

interface ArquivarProcessoProps {
  idProcesso: string;
}

export function ArquivarProcesso({ idProcesso }: ArquivarProcessoProps) {
  const form = useForm<arquivarData>({
    resolver: zodResolver(arquivarSchema),
    defaultValues: {
      titulo: "",
      descricao: "",
      idProcesso: idProcesso,
      documentos: [],
      confirmacao: false,
    },
  });

  const onSubmit: SubmitHandler<arquivarData> = async (data) => {
    console.log(data);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" className="w-full md:w-fit">
          Arquivar processo
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[860px] pb-4">
        <DialogHeader className="bg-transparent">
          <DialogTitle className="text-xl font-medium">
            Arquivar processo
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="px-6">
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="titulo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Título</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="border-0 bg-transparent bg-[#EFEFEF] rounded-2xl"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="descricao"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descrição</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          className="border-0 bg-transparent bg-[#EFEFEF] rounded-2xl min-h-44"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex items-center gap-4 my-6 opacity-50 pointer-events-none">
                <Button type="button" variant="secondary">
                  Anexar
                </Button>

                <span>Nenhum arquivo selecionado.</span>
              </div>
            </div>

            <div className="flex items-center justify-between flex-col md:flex-row gap-y-6 gap-x-20 bg-[#FCFCFC] px-6 mt-11">
              <FormField
                control={form.control}
                name="confirmacao"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <div className="flex flex-row items-start space-x-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="text-base font-normal leading-none">
                        Estou ciente que este processo é irreversível segundo a
                        legislação.
                      </FormLabel>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center gap-4 flex-col md:flex-row w-full md:w-fit">
                <Button variant="secondary" className="w-full md:w-fit">Confirmar</Button>

                <DialogClose asChild>
                  <Button type="button" className="w-full md:w-fit">Desistir</Button>
                </DialogClose>
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
