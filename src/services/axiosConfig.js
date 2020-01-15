import axios from 'axios';
import PKG from '../../package.json';
import {
  getTokenFromLocalStorage,
  removeUserFromLocalStorage,
  removeTokenFromLocalStorage
} from '../localStorageUtils/authManager.js';

export const API_VERSION = 'v1';

const Axios = axios.create({
  baseURL: `${PKG.proxy}/api/${API_VERSION}/`,
  timeout: 5000,
  headers: { 'X-Version-Requested': API_VERSION }
});

Axios.interceptors.request.use(config => {
  const token = getTokenFromLocalStorage();
  if (token) config.headers['Authorization'] = `Bearer ${token}`;
  else {
    removeTokenFromLocalStorage();
    removeUserFromLocalStorage();
  }

  return config;
});

export default Axios;
