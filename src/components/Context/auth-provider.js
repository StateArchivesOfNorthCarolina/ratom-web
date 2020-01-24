import React, {
  createContext,
  useState,
  useEffect,
  // useMemo,
  useContext
} from 'react';
import {
  setTokenToLocalStorage,
  getTokenFromLocalStorage,
  removeTokenFromLocalStorage,
  setRefreshTokenToLocalStorage,
  setUserToLocalStorage,
  getUserFromLocalStorage,
  removeUserFromLocalStorage
} from '../../localStorageUtils/authManager';

// Axios
import Axios from '../../services/axiosConfig';
import { GET_USER } from '../../services/requests';

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
    Axios.get(GET_USER)
      .then(response => {
        setTokenToLocalStorage(access);
        setRefreshTokenToLocalStorage(refresh);
        setUserToLocalStorage(response.data);
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
