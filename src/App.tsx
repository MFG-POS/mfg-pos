import { ChakraProvider, ColorModeScript, Flex } from '@chakra-ui/react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import routes, { authenticationRoutes } from 'routing';
import { theme } from 'others/theme';
import MainTemplate from 'components/templates/MainTemplate';
import ProtectedRoute from 'auth/ProtectedRoute';
import { AuthProvider } from 'auth/AuthContext';
import AuthenticationRoute from 'auth/AuthenticationRoute';

const App = () => (
  <Router>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode="light" />
      <AuthProvider>
        <MainTemplate>
          <Flex alignItems="center" flexDir="column" justifyContent="center">
            <Switch>
              {authenticationRoutes.map(({ component, path, isExact }) => (
                <AuthenticationRoute key={uuidv4()} path={path} exact={isExact}>
                  {component}
                </AuthenticationRoute>
              ))}
              {routes.map(({ component, path, isExact, isProtected }) => (
                <ProtectedRoute key={uuidv4()} path={path} exact={isExact} isProtected={isProtected}>
                  {component}
                </ProtectedRoute>
              ))}
            </Switch>
          </Flex>
        </MainTemplate>
      </AuthProvider>
    </ChakraProvider>
  </Router>
);

export default App;
