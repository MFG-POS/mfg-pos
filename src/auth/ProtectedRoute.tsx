import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useAuth } from 'auth/AuthContext';

interface ProtectedRouteProps extends RouteProps {
  isProtected?: boolean;
}

const ProtectedRoute = ({ isProtected, ...routeProps }: ProtectedRouteProps) => {
  const { currentUser, isAdmin } = useAuth();

  if (!currentUser) return <Redirect to="/login" />;
  if (isAdmin || !isProtected) return <Route {...routeProps} />;
  return <Redirect to="/" />;
};

export default ProtectedRoute;
