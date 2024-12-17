import { redirect } from "next/navigation";

export default function CadastroImovelPJPage({
  params,
}: {
  params: { municipio: string };
}) {
  redirect(
    `/${params.municipio}/imoveis/cadastro/pessoa-juridica/representantes`
  );
}
