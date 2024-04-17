import api from "./api";
import IUserLogin from "@/interfaces/IUserLogin";
import { ACCESS_TOKEN } from "@/constants/auth";

export const login = async (user: IUserLogin) => {
  return await api.post("/autenticacao/login", user);
};

export const actionLogout = async() => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    localStorage.removeItem(ACCESS_TOKEN)
    return await api.post("/autenticacao/login", token);
  }
