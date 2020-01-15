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

import { useHistory } from 'react-router-dom';

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
    const history = useHistory();
    const originalRequest = error.config;

    if (
      error.response.status === 401 &&
      originalRequest.url === `${PKG.proxy}/api/${API_VERSION}/token/`
    ) {
      removeTokenFromLocalStorage();
      removeRefreshTokenFromLocalStorage();
      removeUserFromLocalStorage();
      history.push('/');
      return Promise.reject(error);
    }

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = getRefreshTokenFromLocalStorage();
      return axios
        .post('/token/refresh', {
          refresh: refreshToken
        })
        .then(response => {
          if (response.status === 201) {
            const token = response.data;
            setTokenToLocalStorage(token);
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
            return axios(originalRequest);
          }
        });
    }
    return Promise.reject(error);
  }
);

export default Axios;

// import axios from 'axios';
// import PKG from '../../package.json';
// import {
//   getTokenFromLocalStorage,
//   removeUserFromLocalStorage,
//   removeTokenFromLocalStorage
// } from '../localStorageUtils/authManager.js';

// export const API_VERSION = 'v1';

// const Axios = axios.create({
//   baseURL: `${PKG.proxy}/api/${API_VERSION}/`,
//   timeout: 5000,
//   headers: { 'X-Version-Requested': API_VERSION }
// });

// Axios.interceptors.request.use(config => {
//   const token = getTokenFromLocalStorage();
//   if (token) {
//     config.headers['Authorization'] = `Bearer ${token}`

//   }
//   else {
//     removeUserFromLocalStorage();
//   }

//   return config;
// });

// export default Axios;

///////////////////////////
