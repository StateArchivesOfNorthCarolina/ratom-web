import axios from 'axios';
import PKG from '../../package.json';
import {
  getTokenFromLocalStorage,
  getRefreshTokenFromLocalStorage,
  removeRefreshTokenFromLocalStorage,
  setTokenToLocalStorage,
  removeTokenFromLocalStorage,
  removeUserFromLocalStorage
} from '../localStorageUtils/authManager.js';

export const API_VERSION = 'v1';

const Axios = axios.create({
  baseURL: `${PKG.proxy}/api/${API_VERSION}/`,
  timeout: 5000,
  headers: { 'X-Version-Requested': API_VERSION }
});

// Add a request interceptor
Axios.interceptors.request.use(
  request => {
    const token = getTokenFromLocalStorage();
    if (token) {
      request.headers['Authorization'] = 'Bearer ' + token;
    }
    return request;
  },
  error => {
    Promise.reject(error);
  }
);

Axios.interceptors.response.use(
  response => response,
  error => {
    const originalRequest = error.config;

    if (error.response.status === 401 && originalRequest.url === 'token/') {
      // Got 401 on Login, so it's just bad credentials. Pass through.
      return Promise.reject(error);
    }

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = getRefreshTokenFromLocalStorage();
      return axios
        .post(`${PKG.proxy}/api/${API_VERSION}/token/refresh/`, {
          refresh: refreshToken
        })
        .then(response => {
          if (response.status === 200 || response.status === 201) {
            const { access } = response.data;
            setTokenToLocalStorage(access);
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + access;
            originalRequest.headers['Authorization'] = 'Bearer ' + access;
            return axios(originalRequest);
          }
        })
        .catch(_ => {
          // Prolly just the refresh token has expired
          // TODO: Show user something a bit more friendly than just punting them back to login
          removeRefreshTokenFromLocalStorage();
          removeTokenFromLocalStorage();
          removeUserFromLocalStorage();
          window.location = '/';
        });
    }
    return Promise.reject(error);
  }
);

export default Axios;
