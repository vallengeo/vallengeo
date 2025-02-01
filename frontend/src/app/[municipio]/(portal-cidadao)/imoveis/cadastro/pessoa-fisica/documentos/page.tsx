import { Metadata } from "next";
import { Steps } from "../../_components/steps";
import { FormCadastroDocumentos } from "./_components/form";
import ITipoDocumento from "@/interfaces/ITipoDocumento";
import { tipoDocumento } from "@/service/documentoService";

export const metadata: Metadata = {
  title: "Documentos | VallenGeo",
};

async function getDocumentos(): Promise<ITipoDocumento[]> {
  const response = await tipoDocumento();
  return response.data;
}

export default async function CadastroDocumentosPage() {
  const documentos = await getDocumentos();

  return (
    <>
      <Steps currentStep={3} />
      <FormCadastroDocumentos documentos={documentos} />
    </>
  );
}
