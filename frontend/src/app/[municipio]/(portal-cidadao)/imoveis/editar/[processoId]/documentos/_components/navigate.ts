"use server";

import { redirect } from "next/navigation";

export async function handlePreviousStep(
  municipio: string,
  processoId: string
) {
  redirect(`/${municipio}/imoveis/editar/${processoId}/imovel`);
}
