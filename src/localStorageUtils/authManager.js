import { AUTH_TOKEN, REFRESH_TOKEN, USER } from '../constants/localStorageConstants';
import {
  getValueFromLocalStorage,
  setValueToLocalStorage,
  removeValueFromLocalStorage
} from './localStorageManager';

export const getTokenFromLocalStorage = () => getValueFromLocalStorage(AUTH_TOKEN);
export const setTokenToLocalStorage = value => setValueToLocalStorage(AUTH_TOKEN, value);
export const removeTokenFromLocalStorage = () => removeValueFromLocalStorage(AUTH_TOKEN);

export const getRefreshTokenFromLocalStorage = () => getValueFromLocalStorage(REFRESH_TOKEN);
export const setRefreshTokenToLocalStorage = value => setValueToLocalStorage(REFRESH_TOKEN, value);
export const removeRefreshTokenFromLocalStorage = () => removeValueFromLocalStorage(REFRESH_TOKEN);

export const getUserFromLocalStorage = () => getValueFromLocalStorage(USER);
export const setUserToLocalStorage = value => setValueToLocalStorage(USER, value);
export const removeUserFromLocalStorage = () => removeValueFromLocalStorage(USER);
