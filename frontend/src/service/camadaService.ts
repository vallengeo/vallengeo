import Cookies from "js-cookie";

import api from "@/service/api";
import Camada from "@/interfaces/ICamada";
import { GRUPO_ID } from "@/constants/auth";

export const buscarCamadasPeloGrupoId = async (): Promise<Camada[]> => {
  const grupoId = Cookies.get(GRUPO_ID);
  const { data } = await api.get(`/camada/grupo/${grupoId}`);
  return data;
};
