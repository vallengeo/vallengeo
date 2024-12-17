import api from '@/service/api'
import Cookies from 'js-cookie'
import { ACCESS_TOKEN } from "@/constants/auth";

export const imoveisCadastradosMapa = async () => {
    const token = Cookies.get(ACCESS_TOKEN);
  
    return await api.get("analista/imovel/cadastrados/mapa", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }