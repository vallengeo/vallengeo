import api from "./api";
import Cookies from "js-cookie";
import { ACCESS_TOKEN } from "@/constants/auth";
import ICadastroPessoa from "@/interfaces/Pessoa/ICadastroPessoa";

export const buscarPessoaPorId = async (id: number) => {
  const token = Cookies.get(ACCESS_TOKEN);

  return await api.get(`pessoa/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const listarPessoas = async () => {
  const token = Cookies.get(ACCESS_TOKEN);

  return await api.get("pessoa", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
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
