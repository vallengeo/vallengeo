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
    "/imovel/obter-geometria-por-arquivo",
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

  const response = await api.post("/imovel/cadastro", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const editarImovel = async (
  processoId: string,
  formData: ICadastroImovel
) => {
  const token = Cookies.get(ACCESS_TOKEN);

  const response = await api.post(`/imovel/editar/${processoId}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
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
      pagina: 0,
      "itens-por-pagina": 6,
    },
  });

  return response.data;
};

export const ficha = async (processoId: string) => {
  const token = Cookies.get(ACCESS_TOKEN);

  return api.get(`/imovel/ficha/${processoId}`, {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjp7ImlkIjoiOTliNTUxZjgtZjUzMi00MGEwLWI2M2YtMDk0NjYxODQ0YmQ4Iiwibm9tZSI6InZhbGxlbmdlby5kZXZAZ21haWwuY29tIiwicHJpbWVpcm9Ob21lIjoidmFsbGVuZ2VvLmRldkBnbWFpbC5jb20iLCJlbWFpbCI6InZhbGxlbmdlby5kZXZAZ21haWwuY29tIiwiYXRpdm8iOnRydWUsImlkR3J1cG8iOiI0ZDNjMTQ5Ny1hZjQwLTRkZGYtOGIwNi1kOGY0MGM4ZGYxMzkiLCJncnVwb3MiOlsiQ1JVWkVJUk8iXSwidGVsYXMiOlsiSE9NRSIsIklNT1ZFTCIsIlBST1RPQ09MTyIsIlJFTEFUT1JJTyJdLCJwZXJmaXMiOlsiQURNSU5JU1RSQURPUiJdLCJwZXJtaXNzb2VzIjpbIkhPTUVfQVRVQUxJWkFDQU9fUFJPQ0VTU09fVklTVUFMSVpBUiIsIkhPTUVfUkVTVU1PX0lNT1ZFTF9BUlFVSVZBUiIsIkhPTUVfUkVTVU1PX0lNT1ZFTF9ET1dOTE9BRCIsIkhPTUVfUkVTVU1PX0lNT1ZFTF9FRElUQVIiLCJIT01FX1JFU1VNT19JTU9WRUxfVklTVUFMSVpBUiIsIkhPTUVfVUxUSU1PX1BST0NFU1NPX1ZJU1VBTElaQVIiLCJJTU9WRUxfQ0FEQVNUUkFSIiwiSU1PVkVMX0xJU1RBX0lNT1ZFTF9BUlFVSVZBUiIsIklNT1ZFTF9MSVNUQV9JTU9WRUxfUkVMQVRPUklPIiwiSU1PVkVMX0xJU1RBX0lNT1ZFTF9WSVNVQUxJWkFSIiwiUFJPVE9DT0xPX0xJU1RBX1BST0NFU1NPX0FSUVVJVkFSIiwiUFJPVE9DT0xPX0xJU1RBX1BST0NFU1NPX1JFTEFUT1JJTyIsIlBST1RPQ09MT19MSVNUQV9QUk9DRVNTT19WSVNVQUxJWkFSIiwiUkVMQVRPUklPX0dFUkFSIiwiUkVMQVRPUklPX1JFU1VNT19JTU9WRUxfRE9XTkxPQUQiXX0sInN1YiI6InZhbGxlbmdlby5kZXZAZ21haWwuY29tIiwiaWF0IjoxNzM3MzE0NzA2LCJleHAiOjE3Mzc0MDExMDZ9.KLNaeqcQ1w5oDEBVMfd-Dmrc-nh9v9EjbaRQpIyB1Hw`,
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
