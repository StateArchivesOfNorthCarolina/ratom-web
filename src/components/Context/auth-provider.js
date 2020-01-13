import React, {
  createContext,
  useState,
  useEffect,
  // useMemo,
  useContext
} from 'react';
import {
  getTokenFromLocalStorage,
  setTokenToLocalStorage,
  setUserToLocalStorage,
  removeUserFromLocalStorage,
  getUserFromLocalStorage,
  removeTokenFromLocalStorage
} from '../../localStorageUtils/authManager';

export const AuthContext = createContext(null);

const initialAuthData = {};

const AuthProvider = props => {
  const [authData, setAuthData] = useState(initialAuthData);

  useEffect(() => {
    const token = authData.token || getTokenFromLocalStorage();
    const user = authData.user || getUserFromLocalStorage();

    const currentAuthData = { token, user };
    setAuthData(currentAuthData);
  }, [authData.token, authData.user]);

  const onLogout = () => {
    removeTokenFromLocalStorage();
    removeUserFromLocalStorage();
    setAuthData(initialAuthData);
  };

  const onLogin = newAuthData => {
    const { token, user } = newAuthData;
    setTokenToLocalStorage(token);
    setUserToLocalStorage(user);

    setAuthData(newAuthData);
  };

  return <AuthContext.Provider value={{ ...authData, onLogin, onLogout }} {...props} />;
};

export const useAuthContext = () => useContext(AuthContext);

export default AuthProvider;
