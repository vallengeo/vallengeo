"use server";

import { redirect } from "next/navigation";

export async function handleNextStep(municipio: string, processoId: string) {
  redirect(`/${municipio}/imoveis/editar/${processoId}/imovel`);
}
