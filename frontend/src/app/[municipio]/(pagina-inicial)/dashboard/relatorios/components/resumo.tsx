"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  items,
  relatoriosSchema,
  relatoriosData,
} from "@/validation/relatorios";
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

export function ResumoRelatorios() {
  const form = useForm<relatoriosData>({
    resolver: zodResolver(relatoriosSchema),
  });

  const onSubmit: SubmitHandler<relatoriosData> = (data) => {
    console.log(data);
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
              render={() => (
                <FormItem className="flex items-center flex-wrap gap-x-4 gap-y-5 max-w-[550px] space-y-0">
                  {items.map((item) => (
                    <FormField
                      key={item.id}
                      control={form.control}
                      name="items"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={item.id}
                            className="flex flex-row items-center space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item.id)}
                                onCheckedChange={(checked) => {
                                  const isChecked = checked;
                                  const updatedValue = field.value ?? [];

                                  if (isChecked) {
                                    updatedValue.push(item.id);
                                  } else {
                                    const index = updatedValue.indexOf(item.id);

                                    if (index !== -1) {
                                      updatedValue.splice(index, 1);
                                    }
                                  }

                                  field.onChange(updatedValue);
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal text-base">
                              {item.label}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="text-right">
              <Button type="submit">Gerar relatório</Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
}
