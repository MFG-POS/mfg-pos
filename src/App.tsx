import { ChakraProvider, ColorModeScript, Flex } from '@chakra-ui/react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import routes from 'routing';
import { theme } from 'others/theme';
import MainTemplate from 'components/templates/MainTemplate';

const App = () => (
  <Router>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode="light" />
      <MainTemplate>
        <Flex alignItems="center" flexDir="column" justifyContent="center">
          <Switch>
            {routes.map(({ component, path, isExact }) => (
              <Route key={uuidv4()} path={path} exact={isExact}>
                {component}
              </Route>
            ))}
          </Switch>
        </Flex>
      </MainTemplate>
    </ChakraProvider>
  </Router>
);

export default App;
