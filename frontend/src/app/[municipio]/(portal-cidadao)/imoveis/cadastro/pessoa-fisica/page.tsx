import { redirect } from "next/navigation";

export default function CadastroImovelPFPage({
  params,
}: {
  params: { municipio: string };
}) {
  redirect(
    `/${params.municipio}/imoveis/cadastro/pessoa-fisica/representantes`
  );
}
