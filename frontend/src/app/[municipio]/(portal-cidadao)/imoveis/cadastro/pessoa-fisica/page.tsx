import { redirect } from "next/navigation";

export default function CadastroImovelPage({
  params,
}: {
  params: { municipio: string };
}) {
  return redirect(
    `/${params.municipio}/imoveis/cadastro/pessoa-fisica/representantes`
  );
}
