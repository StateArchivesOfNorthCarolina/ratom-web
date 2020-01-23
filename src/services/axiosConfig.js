import axios from 'axios';
import * as authManager from '../localStorageUtils/authManager.js';

export const API_VERSION = 'v1';

const Axios = axios.create({
  baseURL: `/api/${API_VERSION}/`,
  timeout: 5000,
  headers: { 'X-Version-Requested': API_VERSION }
});

/**
 * A Request interceptor.
 * first callback intercepts successfully formed requests
 * second callback handles errors, so pass through
 */
Axios.interceptors.request.use(
  request => {
    // If request is formed successfully, get token from local storage, if it's there.
    const token = authManager.getTokenFromLocalStorage();
    // Add token to Authorization header of all outgoing requests.
    if (token) request.headers['Authorization'] = 'Bearer ' + token;
    // Either way, pass request through.
    return request;
  },
  error => Promise.reject(error)
);

/**
 * A Response interceptor.
 * first callback handles success, so pass through
 * second callback handles errors
 */
Axios.interceptors.response.use(
  success => success,
  error => {
    const { status } = error.response;
    // Only care about 401s so far, so pass through
    if (status !== 401) return Promise.reject(error);
    return handle401Response(error);
  }
);

const handle401Response = async error => {
  const { config } = error;
  const originalRequest = config;

  // Got 401 on Login or Token refresh, so it's just bad credentials or expired refresh token. Pass through.
  if (originalRequest.url.includes('token/')) return Promise.reject(error);

  // Prevent infinite loop of requests by setting a _retry property on orignalRequest
  if (!originalRequest._retry) {
    originalRequest._retry = true;
    const refreshUrl = `/token/refresh/`;
    const refresh = authManager.getRefreshTokenFromLocalStorage();
    try {
      const { status, data } = await Axios.post(refreshUrl, { refresh });
      if (status === 200 || status === 201) {
        const { access } = data;
        const tokenHeader = 'Bearer ' + access;
        authManager.setTokenToLocalStorage(access);
        Axios.defaults.headers.common['Authorization'] = tokenHeader;
        originalRequest.headers['Authorization'] = tokenHeader;
        return Axios(originalRequest);
      }
    } catch (refreshError) {
      // Here, we're assuming that the error was an error response from axios.post(refreshUrl)
      // Whether it is or isn't, we do the same thing-- but we reject the promise for error reporting
      // just in case.
      authManager.removeRefreshTokenFromLocalStorage();
      authManager.removeTokenFromLocalStorage();
      authManager.removeUserFromLocalStorage();
      // TODO: Show user something a bit more friendly than just punting them back to login

      window.location = '/';
      return Promise.reject(`Token Refresh Error: ${refreshError.message}`);
    }
  }
};

export default Axios;
