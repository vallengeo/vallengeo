import api from "./api";
import Cookies from 'js-cookie'
import { ACCESS_TOKEN } from "@/constants/auth";

export const tipoDocumento = async () => {
  const token = Cookies.get(ACCESS_TOKEN);

  return await api.get("documento/tipo-documento", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}

export const downloadDocumento = async (idDocumento: string) => {
  const token = Cookies.get(ACCESS_TOKEN);

  return await api.get(`documento/download/${idDocumento}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}
