"use server";

import { redirect } from "next/navigation";

export async function handleNextStep(municipio: string) {
  redirect(`/${municipio}/imoveis/cadastro/pessoa-juridica/imovel`);
}
