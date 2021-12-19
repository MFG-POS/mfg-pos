import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useAuth } from 'auth/AuthContext';

const AuthenticationRoute = ({ ...routeProps }: RouteProps) => {
  const { currentUser } = useAuth();

  return currentUser ? <Redirect to="/" /> : <Route {...routeProps} />;
};

export default AuthenticationRoute;
