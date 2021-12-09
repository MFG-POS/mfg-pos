import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useAuth } from 'auth/AuthContext';

const LoginRoute = ({ ...routeProps }: RouteProps) => {
  const { currentUser } = useAuth();

  return currentUser ? <Redirect to="/" /> : <Route {...routeProps} />;
};

export default LoginRoute;
