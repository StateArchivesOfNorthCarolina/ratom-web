import { VIEW_AS_PLAINTEXT } from '../constants/localStorageConstants';

export function getViewAsPlaintextFromLS() {
  const val = localStorage.getItem(VIEW_AS_PLAINTEXT);
  if (val === 'true') return true;
  return false;
}
