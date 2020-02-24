import React from 'react';
import { Route } from 'react-router-dom';
import { useAuthContext } from '../Context/auth-provider';

// Children
import Login from './Login/Login';

const PrivateRoute = ({ component, ...options }) => {
  const { user } = useAuthContext();
  const derivedComponent = user ? component : Login;

  return <Route {...options} component={derivedComponent} />;
};

export default PrivateRoute;
