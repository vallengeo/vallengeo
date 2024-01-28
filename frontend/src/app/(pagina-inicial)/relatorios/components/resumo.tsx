"use client"

import Link from "next/link"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, SubmitHandler } from "react-hook-form"

import { items, relatoriosSchema, relatoriosData } from "@/validation/relatorios"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { Download } from "lucide-react"

const relatorios = [
  {
    id: 1,
    name: "elatorio1212210.pdf",
    link: "/relatorios/relatorio1212210.pdf",
  },
  {
    id: 2,
    name: "elatorio1212210.pdf",
    link: "/relatorios/relatorio1212210.pdf",
  },
  {
    id: 3,
    name: "elatorio1212210.pdf",
    link: "/relatorios/relatorio1212210.pdf",
  },
  {
    id: 4,
    name: "elatorio1212210.pdf",
    link: "/relatorios/relatorio1212210.pdf",
  },
  {
    id: 5,
    name: "elatorio1212210.pdf",
    link: "/relatorios/relatorio1212210.pdf",
  }
]

export function ResumoRelatorios() {
  const form = useForm<relatoriosData>({
    resolver: zodResolver(relatoriosSchema),
    defaultValues: {
      items: ['imoveis'],
    }
  })

  const onSubmit: SubmitHandler<relatoriosData> = (data) => {
    console.log(data)
  }

  return (
    <>
      <div className="bg-white border border-input rounded-3xl p-6">
        <header className="max-w-[370px]">
          <h2 className="text-xl">Realize a seleção de filtros para encontrar o seu relatório</h2>
        </header>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-6 mb-5">
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
                                  return checked
                                    ? field.onChange([...field.value, item.id])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== item.id
                                        )
                                      )
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal text-base">
                              {item.label}
                            </FormLabel>
                          </FormItem>
                        )
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

      {true && (
        <div className="bg-white border border-input rounded-3xl p-6">
          <h2 className="text-xl">Resumo de imóveis</h2>

          <div className="space-y-2 mt-4">
            {relatorios.map(relatorio => (
              <Link
                key={relatorio.id}
                href={relatorio.link}
                download
                className="flex items-center justify-between bg-[#FDFDFD] hover:bg-muted/50 transition-colors border border-[#F0F0F0] rounded-2xl py-2 px-5"
              >
                <span>{relatorio.name}</span>
                <Download size={24} />
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
