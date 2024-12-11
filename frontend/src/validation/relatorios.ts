"use client"

import * as z from "zod"

export const items = [
  {
    id: "imoveis",
    label: "Imoveis",
  },
  {
    id: "novos",
    label: "Novos imoveis",
  },
  {
    id: "andamento",
    label: "Em andamento",
  },
  {
    id: "finalizados",
    label: "Processos finalizados",
  },
  {
    id: "cancelados",
    label: "Cancelados",
  },
] as const

export const relatoriosSchema = z.object({
  items: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "Você deve selecionar pelo menos um item.",
  }),
})

export type relatoriosData = z.infer<typeof relatoriosSchema>