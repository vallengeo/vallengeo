import * as z from "zod";

export const relatoriosSchema = z.object({
  items: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "Você deve selecionar pelo menos um item.",
  }),
});

export type relatoriosData = z.infer<typeof relatoriosSchema>;
