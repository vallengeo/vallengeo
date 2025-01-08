import api from "./api";
import Cookies from "js-cookie";
import { ACCESS_TOKEN } from "@/constants/auth";
import IUploadTemp from "@/interfaces/Documento/IUploadTemp";
import ICadastroDocumento from "@/interfaces/Documento/ICadastroDocumento";

export const tipoDocumento = async () => {
  const token = Cookies.get(ACCESS_TOKEN);

  return await api.get("documento/tipo-documento", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const tipoDocumentoEnviado = async (idProcesso: string) => {
  const token = Cookies.get(ACCESS_TOKEN);

  return await api.get(`documento/tipo-documento/enviado/${idProcesso}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const tipoDocumentoNaoEnviado = async (idProcesso: string) => {
  const token = Cookies.get(ACCESS_TOKEN);

  return await api.get(`documento/tipo-documento/nao-enviado/${idProcesso}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const documentoEnviado = async (idProcesso: string) => {
  const token = Cookies.get(ACCESS_TOKEN);

  return await api.get(`documento/enviado/${idProcesso}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const downloadDocumento = async (idDocumento: string) => {
  const token = Cookies.get(ACCESS_TOKEN);

  return await api.get(`documento/download/${idDocumento}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const uploadDocumentoTemporario = async (
  tipoDocumentoId: number,
  file: IUploadTemp
) => {
  const token = Cookies.get(ACCESS_TOKEN);

  const response = await api.post(
    `documento/upload-temp/tipo-documento/${tipoDocumentoId}`,
    file,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const cadastrarDocumento = async (formData: ICadastroDocumento) => {
  const token = Cookies.get(ACCESS_TOKEN);

  const response = await api.post("documento/cadastro", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
