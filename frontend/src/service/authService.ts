import api from "./api";
import IUserLogin from "@/interfaces/IUserLogin";
import { ACCESS_TOKEN } from "@/constants/auth";
import { cookies } from "@/lib/utils";
import Cookies from 'js-cookie'

export const login = async (user: IUserLogin) => {
  return await api.post("/autenticacao/login", user);
};

export const actionLogout = async () => {
  await api.get("/autenticacao/logout");
  Cookies.remove(ACCESS_TOKEN);
  return null;
};

export const isAuthenticated = () => {
  return !!cookies().get(ACCESS_TOKEN)?.value;
}
