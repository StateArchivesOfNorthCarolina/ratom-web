import React, {
  createContext,
  useState,
  useEffect,
  // useMemo,
  useContext
} from "react";
import { 
    getTokenFromLocalStorage, 
    setTokenToLocalStorage, 
    setUserToLocalStorage, 
    clearUserFromLocalStorage, 
    clearTokenFromLocalStorage, 
    getUserFromLocalStorage
} from "../../util/authManager";


export const AuthContext = createContext(null);

const initialAuthData = {};

const AuthProvider = props => {
  const [authData, setAuthData] = useState(initialAuthData);

  useEffect(() => {
    const token = getTokenFromLocalStorage();
    const user = getUserFromLocalStorage()
    
    const currentAuthData = { token, user };
    setAuthData(currentAuthData);
  }, []);

  const onLogout = () => {
    clearTokenFromLocalStorage();
    clearUserFromLocalStorage();
    setAuthData(initialAuthData);
  }

  const onLogin = newAuthData => {
    const { token, user } = newAuthData;
    // TODO: token and user may not be at this depth.
    setTokenToLocalStorage(token);
    setUserToLocalStorage(user);
    setAuthData(newAuthData);
  }

  // const authDataValue = useMemo({ ...authData, onLogin, onLogout }, [authData]);

  return (
    <AuthContext.Provider
      value={{ ...authData, onLogin, onLogout }}
      {...props}
    />
  );
};

export const useAuthContext = () => useContext(AuthContext);

export default AuthProvider;
