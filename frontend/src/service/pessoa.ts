import api from "./api";
import Cookies from "js-cookie";
import { ACCESS_TOKEN } from "@/constants/auth";
import ICadastroPessoa from "@/interfaces/Pessoa/ICadastroPessoa";
import { cookies } from "@/lib/utils";

export const buscarPessoaPorId = async (id: string) => {
  const cookieStore = await cookies();
  const token = cookieStore.get(ACCESS_TOKEN).value;

  const response = await api.get(`pessoa/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const listarPessoas = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get(ACCESS_TOKEN).value;

  const response = await api.get("pessoa", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const buscarPorDocumento = async (documento: string) => {
  const token = Cookies.get(ACCESS_TOKEN);

  return await api.get(`pessoa/buscar-por-documento/${documento}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const cadastrarPessoa = async (formData: ICadastroPessoa) => {
  const token = Cookies.get(ACCESS_TOKEN);

  const response = await api.post("pessoa", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const editarPessoa = async (id: string, formData: ICadastroPessoa) => {
  const token = Cookies.get(ACCESS_TOKEN);

  const response = await api.put(`pessoa/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data
};
