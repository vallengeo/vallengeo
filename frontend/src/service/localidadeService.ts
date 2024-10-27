import api from "./api";

export const getCep = async (cep: string) => {
  return await api.get(`localidade/cep/${cep}`);
}
