import {
  getValueFromLocalStorage,
  setValueToLocalStorage,
  removeValueFromLocalStorage
} from './localStorageManager';
import { FILTER_QUERY } from '../constants/localStorageConstants';
import emptyQuery from '../components/Containers/Messages/emptyQuery';

export const getFilterQueryFromLocalStorage = accountId => {
  const queryList = getValueFromLocalStorage(FILTER_QUERY);
  return (queryList && queryList[accountId]) || emptyQuery;
};
export const setFilterQueryToLocalStorage = (accountId, value) => {
  const queryList = getValueFromLocalStorage(FILTER_QUERY);
  setValueToLocalStorage(FILTER_QUERY, {
    ...queryList,
    [accountId]: value
  });
};
export const removeFilterQueryFromLocalStorage = () => removeValueFromLocalStorage(FILTER_QUERY);
