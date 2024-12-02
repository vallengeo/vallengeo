import api from "./api";
import Cookies from "js-cookie";
import { ACCESS_TOKEN } from "@/constants/auth";
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
