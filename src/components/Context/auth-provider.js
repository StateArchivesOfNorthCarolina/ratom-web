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
import { showUser } from '../../services/requests';
import Axios from '../../services/axiosConfig';

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
    const { access, refresh } = newAuthData;
    Axios.defaults.headers.common['Authorization'] = `Bearer ${access}`;
    showUser()
      .then(response => {
        setUserToLocalStorage(response.data);
        setTokenToLocalStorage(access);
        setAuthData(newAuthData);
      })
      .catch(error => {
        //TODO: Handle error at all
        console.warn(error.message);
      });
  };

  return <AuthContext.Provider value={{ ...authData, onLogin, onLogout }} {...props} />;
};

export const useAuthContext = () => useContext(AuthContext);

export default AuthProvider;
