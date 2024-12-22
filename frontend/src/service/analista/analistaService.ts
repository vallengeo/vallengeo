import api from "@/service/api";
import Cookies from "js-cookie";
import { ACCESS_TOKEN } from "@/constants/auth";

export const totalizadoresProcesso = async () => {
  const token = Cookies.get(ACCESS_TOKEN);

  return await api.get("analista/processo/totalizadores", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const ultimosAdicionados = async () => {
  const token = Cookies.get(ACCESS_TOKEN);

  return await api.get("analista/processo/ultimos-cadastrados", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      pagina: 0,
      "itens-por-pagina": 2
    }
  });
};

export const ultimosAlterados = async () => {
  const token = Cookies.get(ACCESS_TOKEN);

  return await api.get("analista/processo/ultimos-alterados", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      pagina: 0,
      "itens-por-pagina": 2
    }
  });
};

export const imoveisCadastradosMapa = async () => {
  const token = Cookies.get(ACCESS_TOKEN);

  return await api.get("analista/imovel/cadastrados/mapa", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};