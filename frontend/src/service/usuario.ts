import api from "./api";
import Cookies from "js-cookie";
import { ACCESS_TOKEN } from "@/constants/auth";
import ICadastroUsuario from "@/interfaces/Usuario/ICadastroUsuario";
import IRecuperarSenha from "@/interfaces/Usuario/IRecuperarSenha";
import IEsqueciMinhaSenha from "@/interfaces/Usuario/IEsqueciMinhaSenha";

export const listarUsuarios = async () => {
  const token = Cookies.get(ACCESS_TOKEN);

  return await api.get("usuario", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getUsuario = async (id: string) => {
  const token = Cookies.get(ACCESS_TOKEN);

  return await api.get(`usuario/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const removerUsuario = async (id: string) => {
  const token = Cookies.get(ACCESS_TOKEN);

  const response = await api.patch(`usuario/remover/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const cadastrarUsuario = async (formData: ICadastroUsuario) => {
  const token = Cookies.get(ACCESS_TOKEN);

  const response = await api.post("usuario", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const cadastrarUsuarioSimplicado = async (
  formData: Omit<ICadastroUsuario, "telas">
) => {
  const token = Cookies.get(ACCESS_TOKEN);

  const response = await api.post("usuario/simplificado", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const esqueciMinhaSenha = async (formData: IEsqueciMinhaSenha) => {
  const token = Cookies.get(ACCESS_TOKEN);

  const response = await api.post("usuario/esqueci-minha-senha", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const recuperarSenha = async (formData: IRecuperarSenha) => {
  const token = Cookies.get(ACCESS_TOKEN);

  const response = await api.post("usuario/recuperar-senha", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
