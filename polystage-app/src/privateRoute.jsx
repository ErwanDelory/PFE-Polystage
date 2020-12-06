import React from 'react';
import { Route, Redirect } from 'react-router-dom';
//import AuthenticationService from './services/authentication-service';
import { useAuth } from './context/auth';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { authTokens } = useAuth();
  return (
    <Route
      {...rest}
      render={(props) => {
        return authTokens ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/login' }} />
        );
      }}
    />
  );
};

export default PrivateRoute;
