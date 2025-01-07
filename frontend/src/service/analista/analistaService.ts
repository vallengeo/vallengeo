import api from "@/service/api";
import Cookies from "js-cookie";
import { ACCESS_TOKEN } from "@/constants/auth";

export const notificacaoNaoVisualizada = async () => {
  const token = Cookies.get(ACCESS_TOKEN);

  return await api.get("analista/processo/notificacao-nao-visualizada", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      pagin: 0,
      "itens-por-pagina": 5,
    },
  });
};

export const notificacaoVisualizada = async (notificacaoId: number) => {
  const token = Cookies.get(ACCESS_TOKEN);

  return await api.post(
    "analista/processo/notificacao-visualizada",
    notificacaoId,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

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
      "itens-por-pagina": 2,
    },
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
      "itens-por-pagina": 2,
    },
  });
};

export const imoveisCadastrados = async () => {
  const token = Cookies.get(ACCESS_TOKEN);

  const response = await api.get("analista/imovel/cadastrados", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      pagina: 0,
      "itens-por-pagina": 6,
    },
  });

  return response.data;
};

export const imoveisCadastradosMapa = async () => {
  const token = Cookies.get(ACCESS_TOKEN);

  return await api.get("analista/imovel/cadastrados/mapa", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const ficha = async (processoId: string) => {
  const token = Cookies.get(ACCESS_TOKEN);

  const response = await api.get(`analista/imovel/ficha/${processoId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
