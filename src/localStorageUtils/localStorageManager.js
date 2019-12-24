import * as LS from '../constants/localStorageConstants';
const LSConstants = { ...LS };

function controlKey(key) {
  if (LSConstants.hasOwnProperty(key)) return;
  throw new Error(
    `Argument "key" must be a defined constant. Key "${key}" not found in: ${Object.keys(
      LSConstants
    )}`
  );
}

function parseValue(value) {
  try {
    const oVal = JSON.parse(value);
    if (typeof oVal === 'object') return oVal;
  } catch (e) {
    return value;
  }
}

function stringifyValue(value) {
  try {
    if (typeof value !== 'string') {
      return JSON.stringify(value);
    }
    return value;
  } catch (error) {
    throw new Error(
      `Could not JSON.stringify value: ${value}, type: ${typeof value}. Error: ${error}`
    );
  }
}

function throwError(type, error) {
  throw new Error(
    `The following error occured while accessing '${type}' in localStorage: ${error}`
  );
}

export function setValueToLocalStorage(key, value) {
  try {
    controlKey(key);
    const JSONvalue = stringifyValue(value);
    return localStorage.setItem(key, JSONvalue);
  } catch (error) {
    throwError(key, error);
  }
}

export function getValueFromLocalStorage(key) {
  try {
    controlKey(key);
    return parseValue(localStorage.getItem(key));
  } catch (error) {
    throwError(key, error);
  }
}

export function removeValueFromLocalStorage(key) {
  try {
    controlKey(key);
    localStorage.removeItem(key);
  } catch (error) {
    throwError(key, error);
  }
}
