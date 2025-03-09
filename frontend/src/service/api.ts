import axios, { AxiosRequestConfig } from 'axios';
import {
  ACCESS_TOKEN,
  FORBIDDEN_STATUS_CODE,
  GRUPO_ID,
  USER_ID,
  UNAUTHORIZED_STATUS_CODE
} from '@/constants/auth';
import Cookies from 'js-cookie'

const Api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/`,
  headers: {
    'Content-Type': 'application/json'
  }
});

Api.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = Cookies.get(ACCESS_TOKEN);

    if (config.headers === undefined) {
      config.headers = {}
    } else {
      config.headers['modulo'] = 'cidadao'
    }

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }

    return config
  },
  error => {
    Promise.reject(error)
  }
)

Api.interceptors.response.use(
  response => {
    if (response.data && response.data['accessToken']) {
      setRefreshToken(response.data);
    }

    return response;
  },
  async function (error) {
    if (
      error.response &&
      (error.response.status === UNAUTHORIZED_STATUS_CODE ||
      error.response.status === FORBIDDEN_STATUS_CODE)
    ) {
      Cookies.remove(ACCESS_TOKEN);
      Cookies.remove(GRUPO_ID);
      Cookies.remove(USER_ID);

      location.reload();
    }
    return Promise.reject(error);
  }
);

const setRefreshToken = async (data: any) => {
  Cookies.set(ACCESS_TOKEN, data['accessToken']);
  Cookies.set(GRUPO_ID, data['idGrupo']);
};

export default Api;