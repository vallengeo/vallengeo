import api from "./api";
import Cookies from "js-cookie";
import { ACCESS_TOKEN } from "@/constants/auth";

export const listarGrupos = async () => {
  const token = Cookies.get(ACCESS_TOKEN);

  const response = await api.get("grupo", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
