import Axios from './axiosConfig';

//   Auth
export const LOGIN = 'token/';
export const showUser = () => Axios.get(`users/`);

//  Accounts
export const LIST_ACCOUNTS = 'accounts/';

//  Messages
// TODO: How are we including accountId? As part of url or params? (accounts/<id>/messages/?params)
export const SEARCH_MESSAGES = 'messages/?';
export const SHOW_MESSAGE = 'messages/';
