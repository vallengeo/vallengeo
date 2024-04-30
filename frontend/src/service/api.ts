import axios, { AxiosRequestConfig } from 'axios';
import {
  ACCESS_TOKEN,
  FORBIDDEN_STATUS_CODE,
  UNAUTHORIZED_STATUS_CODE
} from '@/constants/auth';
import { actionLogout } from './authService';

const Api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/`,
  headers: {
    'Content-Type': 'application/json'
  }
});

Api.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = localStorage.getItem(ACCESS_TOKEN)

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
      setRefreshToken(response.data['accessToken']);
    }

    return response;
  },
  async function (error) {
    if (
      error.response &&
      (error.response.status === UNAUTHORIZED_STATUS_CODE ||
      error.response.status === FORBIDDEN_STATUS_CODE)
    ) {
       actionLogout();
    }
    return Promise.reject(error);
  }
);

const setRefreshToken = async (token: string) => {
  localStorage.setItem(ACCESS_TOKEN, token);
};

export default Api;