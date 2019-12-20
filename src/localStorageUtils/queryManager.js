import {
  getValueFromLocalStorage,
  setValueToLocalStorage,
  removeValueFromLocalStorage
} from './localStorageManager';
import { FILTER_QUERY } from '../constants/localStorageConstants';

export const getFilterQueryFromLocalStorage = () => getValueFromLocalStorage(FILTER_QUERY);
export const setFilterQueryToLocalStorage = value => setValueToLocalStorage(FILTER_QUERY, value);
export const remoteFilterQueryFromLocalStorage = () => removeValueFromLocalStorage(FILTER_QUERY);
