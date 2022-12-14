/* eslint-disable no-nested-ternary */
import axios from 'axios';
import { getCookie } from './cookie';
// API 인스턴스 생성
const API = axios.create({
  baseURL: 'http://localhost:3090',
  withCredentials: true,
});

API.interceptors.request.use(
  (config) => {
    const data = config;
    const accessToken = getCookie('accessToken');

    data.headers = {
      Authorization: `${accessToken}`,
      Accept: '*/*',
    };

    return data;
  },
  (err) => {
    console.log('api보낼거 오류', err.response.data);
    return Promise.reject(err);
  },
);

export default API;
