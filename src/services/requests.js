import Axios from './axiosConfig';

//   Auth
export const login = creds => Axios.post('token/', creds);
export const showUser = () => Axios.get(`users/`);

//  Accounts
export const listAccounts = () => Axios.get('accounts/');

//  Messages
// TODO: How are we including accountId? As part of url or params? (accounts/<id>/messages/?params)
export const searchMessages = (accountId, params) => Axios.get(`messages/?${params}`);
export const showMessage = messageId => Axios.get(`messages/${messageId}/`);
export const stepThroughPaginatedMessages = url => Axios.get(url);
