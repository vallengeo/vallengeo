import api from "./api";
import Cookies from "js-cookie";
import { ACCESS_TOKEN } from "@/constants/auth";
import { cookies } from "@/lib/utils";
import ICadastroImovel from "@/interfaces/ICadastroImovel";

export const uploadShapeFile = async (file: File[]) => {
  const formData = new FormData();
  file.forEach((f: File) => {
    const blob = new Blob([f], { type: f.type });
    formData.append("file", blob, f.name);
  });

  return api.post(
    "/imovel/georreferenciamento/obter-geometria-por-arquivo",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

export const cadastro = async (formData: ICadastroImovel) => {
  const token = Cookies.get(ACCESS_TOKEN);

  return api.post("/imovel/cadastro", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const tipoUso = async () => {
  const token = Cookies.get(ACCESS_TOKEN);

  return api.get("imovel/tipo-uso", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const cadastrados = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get(ACCESS_TOKEN).value;

  const response = await api.get("imovel/cadastrados", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      "pagina": 1,
      "itens-por-pagina": 6
    }
  });

  return response.data;
};

export const ficha = async (processoId: string) => {
  const token = Cookies.get(ACCESS_TOKEN);

  return api.get(`imovel/ficha/${processoId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fichaDownload = async (processoId: string) => {
  const token = Cookies.get(ACCESS_TOKEN);

  return api.get(`imovel/ficha/${processoId}/download`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
