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

  return await api.get("analista/notificacao-nao-visualizada", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      pagina: 0,
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
      Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjp7ImlkIjoiOTliNTUxZjgtZjUzMi00MGEwLWI2M2YtMDk0NjYxODQ0YmQ4Iiwibm9tZSI6InZhbGxlbmdlby5kZXZAZ21haWwuY29tIiwicHJpbWVpcm9Ob21lIjoidmFsbGVuZ2VvLmRldkBnbWFpbC5jb20iLCJlbWFpbCI6InZhbGxlbmdlby5kZXZAZ21haWwuY29tIiwiYXRpdm8iOnRydWUsImlkR3J1cG8iOiI0ZDNjMTQ5Ny1hZjQwLTRkZGYtOGIwNi1kOGY0MGM4ZGYxMzkiLCJncnVwb3MiOlsiQ1JVWkVJUk8iXSwidGVsYXMiOlsiSE9NRSIsIklNT1ZFTCIsIlBST1RPQ09MTyIsIlJFTEFUT1JJTyJdLCJwZXJmaXMiOlsiQURNSU5JU1RSQURPUiJdLCJwZXJtaXNzb2VzIjpbIkhPTUVfQVRVQUxJWkFDQU9fUFJPQ0VTU09fVklTVUFMSVpBUiIsIkhPTUVfUkVTVU1PX0lNT1ZFTF9BUlFVSVZBUiIsIkhPTUVfUkVTVU1PX0lNT1ZFTF9ET1dOTE9BRCIsIkhPTUVfUkVTVU1PX0lNT1ZFTF9FRElUQVIiLCJIT01FX1JFU1VNT19JTU9WRUxfVklTVUFMSVpBUiIsIkhPTUVfVUxUSU1PX1BST0NFU1NPX1ZJU1VBTElaQVIiLCJJTU9WRUxfQ0FEQVNUUkFSIiwiSU1PVkVMX0xJU1RBX0lNT1ZFTF9BUlFVSVZBUiIsIklNT1ZFTF9MSVNUQV9JTU9WRUxfUkVMQVRPUklPIiwiSU1PVkVMX0xJU1RBX0lNT1ZFTF9WSVNVQUxJWkFSIiwiUFJPVE9DT0xPX0xJU1RBX1BST0NFU1NPX0FSUVVJVkFSIiwiUFJPVE9DT0xPX0xJU1RBX1BST0NFU1NPX1JFTEFUT1JJTyIsIlBST1RPQ09MT19MSVNUQV9QUk9DRVNTT19WSVNVQUxJWkFSIiwiUkVMQVRPUklPX0dFUkFSIiwiUkVMQVRPUklPX1JFU1VNT19JTU9WRUxfRE9XTkxPQUQiXX0sInN1YiI6InZhbGxlbmdlby5kZXZAZ21haWwuY29tIiwiaWF0IjoxNzM3MzE0NzA2LCJleHAiOjE3Mzc0MDExMDZ9.KLNaeqcQ1w5oDEBVMfd-Dmrc-nh9v9EjbaRQpIyB1Hw`,
    },
  });

  return response.data;
};

export const imoveisCadastrados = async () => {
  const token = Cookies.get(ACCESS_TOKEN);

  const response = await api.get("analista/imovel/cadastrados", {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjp7ImlkIjoiOTliNTUxZjgtZjUzMi00MGEwLWI2M2YtMDk0NjYxODQ0YmQ4Iiwibm9tZSI6InZhbGxlbmdlby5kZXZAZ21haWwuY29tIiwicHJpbWVpcm9Ob21lIjoidmFsbGVuZ2VvLmRldkBnbWFpbC5jb20iLCJlbWFpbCI6InZhbGxlbmdlby5kZXZAZ21haWwuY29tIiwiYXRpdm8iOnRydWUsImlkR3J1cG8iOiI0ZDNjMTQ5Ny1hZjQwLTRkZGYtOGIwNi1kOGY0MGM4ZGYxMzkiLCJncnVwb3MiOlsiQ1JVWkVJUk8iXSwidGVsYXMiOlsiSE9NRSIsIklNT1ZFTCIsIlBST1RPQ09MTyIsIlJFTEFUT1JJTyJdLCJwZXJmaXMiOlsiQURNSU5JU1RSQURPUiJdLCJwZXJtaXNzb2VzIjpbIkhPTUVfQVRVQUxJWkFDQU9fUFJPQ0VTU09fVklTVUFMSVpBUiIsIkhPTUVfUkVTVU1PX0lNT1ZFTF9BUlFVSVZBUiIsIkhPTUVfUkVTVU1PX0lNT1ZFTF9ET1dOTE9BRCIsIkhPTUVfUkVTVU1PX0lNT1ZFTF9FRElUQVIiLCJIT01FX1JFU1VNT19JTU9WRUxfVklTVUFMSVpBUiIsIkhPTUVfVUxUSU1PX1BST0NFU1NPX1ZJU1VBTElaQVIiLCJJTU9WRUxfQ0FEQVNUUkFSIiwiSU1PVkVMX0xJU1RBX0lNT1ZFTF9BUlFVSVZBUiIsIklNT1ZFTF9MSVNUQV9JTU9WRUxfUkVMQVRPUklPIiwiSU1PVkVMX0xJU1RBX0lNT1ZFTF9WSVNVQUxJWkFSIiwiUFJPVE9DT0xPX0xJU1RBX1BST0NFU1NPX0FSUVVJVkFSIiwiUFJPVE9DT0xPX0xJU1RBX1BST0NFU1NPX1JFTEFUT1JJTyIsIlBST1RPQ09MT19MSVNUQV9QUk9DRVNTT19WSVNVQUxJWkFSIiwiUkVMQVRPUklPX0dFUkFSIiwiUkVMQVRPUklPX1JFU1VNT19JTU9WRUxfRE9XTkxPQUQiXX0sInN1YiI6InZhbGxlbmdlby5kZXZAZ21haWwuY29tIiwiaWF0IjoxNzM3MzE0NzA2LCJleHAiOjE3Mzc0MDExMDZ9.KLNaeqcQ1w5oDEBVMfd-Dmrc-nh9v9EjbaRQpIyB1Hw`,
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
