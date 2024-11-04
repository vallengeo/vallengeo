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

