import { AUTH_TOKEN, USER } from "../constants/auth";


export function getTokenFromLocalStorage() {
    try {
      return localStorage.getItem(AUTH_TOKEN)
    } catch (error) {
      showError(AUTH_TOKEN, error)
    }
}

export function setTokenToLocalStorage(token) {
    try {
      localStorage.setItem(AUTH_TOKEN, token);
    } catch (error) {
      showError(AUTH_TOKEN, error);
    }   
}

export function clearTokenFromLocalStorage() {
  localStorage.removeItem(AUTH_TOKEN)
}

// USER
export function getUserFromLocalStorage(user) {
  try {
    const jsonUser = localStorage.getItem(USER);
    return JSON.parse(jsonUser)
  } catch (error) {
    showError(USER, error);
  }
}

export function setUserToLocalStorage(user) {
  try {
    const jsonUser = JSON.stringify(user)
    localStorage.setItem(USER, jsonUser);
  } catch (error) {
    showError(USER, error);
  }
}

export function clearUserFromLocalStorage() {
  localStorage.removeItem(USER)
}

export const getIsAuthorized = () => !!getTokenFromLocalStorage();

function showError(type, error) {
  throw new Error(
    `The following error occured while accessing '${type}' in localStorage: ${error}`
  );
}
