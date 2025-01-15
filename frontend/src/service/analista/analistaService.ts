import api from "@/service/api";
import Cookies from "js-cookie";
import { ACCESS_TOKEN } from "@/constants/auth";
import IDownloadRelatorio from "@/interfaces/Analista/IDownloadRelatorio";
import IObservacaoProtocolo from "@/interfaces/Analista/IObservacaoProtocolo";
import IArquivarImovel from "@/interfaces/Analista/IArquivarImovel";

export const filtrosRelatorio = async () => {
  const token = Cookies.get(ACCESS_TOKEN);

  return await api.get("analista/relatorio/filtro", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const protocolo = async (processoId: string) => {
  const token = Cookies.get(ACCESS_TOKEN);

  return await api.get(`analista/protocolo/${processoId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

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

export const ficha = async (processoId: string) => {
  const token = Cookies.get(ACCESS_TOKEN);

  const response = await api.get(`analista/imovel/ficha/${processoId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
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

export const downloadRelatorio = async (formData: IDownloadRelatorio) => {
  const token = Cookies.get(ACCESS_TOKEN);

  const response = await api.post("analista/relatorio/download", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const observacaoProtocolo = async (formData: IObservacaoProtocolo) => {
  const token = Cookies.get(ACCESS_TOKEN);

  const response = await api.post("analista/protocolo/observacao", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const arquivarImovel = async (formData: IArquivarImovel) => {
  const token = Cookies.get(ACCESS_TOKEN);

  const response = await api.post("analista/imovel/arquivar", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
