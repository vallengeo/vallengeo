import api from "./api";

export const getMunicipio = async (id: number) => {
  return await api.get(`localidade/cep/${id}`);
};

export const listarEstados = async () => {
  return await api.get(`localidade/estado`);
};

export const getEstadoPorUF = async (uf: string) => {
  return await api.get(`localidade/estado/${uf}`);
};

export const getMunicipiosPorEstado = async (id: number) => {
  return await api.get(`localidade/estado/${id}/municipio`);
};

export const getEstadoPorId = async (id: number) => {
  return await api.get(`localidade/estado/${id}`);
};

export const getCep = async (cep: string) => {
  return await api.get(`localidade/cep/${cep}`);
};
