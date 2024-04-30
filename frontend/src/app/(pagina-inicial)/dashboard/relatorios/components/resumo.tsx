"use client"

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
import { useState } from "react"
import { Pagination } from "@/components/pagination"

type Relatorio = {
  id: number;
  name: string;
  link: string;
}

const relatorios: Relatorio[] = [
  {
    id: 1,
    name: "relatorio01.pdf",
    link: "/relatorios/relatorio1212210.pdf",
  },
  {
    id: 2,
    name: "relatorio02.pdf",
    link: "/relatorios/relatorio1212210.pdf",
  },
  {
    id: 3,
    name: "relatorio03.pdf",
    link: "/relatorios/relatorio1212210.pdf",
  },
  {
    id: 4,
    name: "relatorio04.pdf",
    link: "/relatorios/relatorio1212210.pdf",
  },
  {
    id: 5,
    name: "relatorio05.pdf",
    link: "/relatorios/relatorio1212210.pdf",
  },
  {
    id: 6,
    name: "relatorio06.pdf",
    link: "/relatorios/relatorio1212210.pdf",
  },
  {
    id: 7,
    name: "relatorio07.pdf",
    link: "/relatorios/relatorio1212210.pdf",
  },
  {
    id: 8,
    name: "relatorio08.pdf",
    link: "/relatorios/relatorio1212210.pdf",
  }
]

export function ResumoRelatorios() {
  const itemsPerPage = 7;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = relatorios.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(relatorios.length / itemsPerPage);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const form = useForm<relatoriosData>({
    resolver: zodResolver(relatoriosSchema)
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
                                  const isChecked = checked
                                  const updatedValue = field.value ?? []

                                  if (isChecked) {
                                    updatedValue.push(item.id)
                                  } else {
                                    const index = updatedValue.indexOf(item.id)

                                    if (index !== -1) {
                                      updatedValue.splice(index, 1)
                                    }
                                  }

                                  field.onChange(updatedValue)
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
            {currentItems.map(relatorio => (
              <a
                key={relatorio.id}
                href={relatorio.link}
                download
                className="flex items-center justify-between bg-[#FDFDFD] hover:bg-muted/50 transition-colors border border-[#F0F0F0] rounded-2xl py-2 px-5"
              >
                <span>{relatorio.name}</span>
                <Download size={24} />
              </a>
            ))}
          </div>

          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            paginate={paginate}
          />
        </div>
      )}
    </>
  )
}
