import { ChakraProvider, ColorModeScript, Flex } from '@chakra-ui/react';
import Categories from 'components/organisms/Tables/Categories';

import MainTemplate from 'components/templates/MainTemplate';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ROUTE_ACCESS, ROUTE_MENU, ROUTE_MENU_FORMS, ROUTE_SETTINGS, ROUTE_STATS, ROUTE_WAREHOUSE } from 'routing';
import Employees from 'views/Access/Employees';
import Dishes from 'views/Menu/Dishes';
import Ingredients from 'views/Menu/Ingredients';
import Products from 'views/Menu/Products';
import General from 'views/Settings/General';
import ABCAnalysis from 'views/Statistics/ABCAnalysis';
import Customers from 'views/Statistics/Customers';
import Payments from 'views/Statistics/Payments';
import Sales from 'views/Statistics/Sales';
import Taxes from 'views/Statistics/Taxes';
import Stock from 'views/Warehouse/Stock';
import Subscription from 'views/Settings/Subscription';
import Supplies from 'views/Warehouse/Supplies';
import Tables from 'views/Settings/Tables';
import DishForm from 'views/Menu/DishForm';
import ProductForm from 'views/Menu/ProductForm';
import IngredientForm from 'views/Menu/IngredientForm';

const App = () => (
  <Router>
    <ChakraProvider>
      <ColorModeScript initialColorMode="light" />
      <MainTemplate>
        <Switch>
          <Flex alignItems="center" flexDir="column" justifyContent="center">
            <Route path={ROUTE_STATS.SALES.path}>
              <Sales />
            </Route>
            <Route path={ROUTE_STATS.CUSTOMERS.path}>
              <Customers />
            </Route>
            <Route path={ROUTE_STATS.ABCANALYSIS.path}>
              <ABCAnalysis />
            </Route>
            <Route path={ROUTE_STATS.PAYMENTS.path}>
              <Payments />
            </Route>
            <Route path={ROUTE_STATS.TAXES.path}>
              <Taxes />
            </Route>
            <Route path={ROUTE_MENU.PRODUCTS.path}>
              <Products />
            </Route>
            <Route path={ROUTE_MENU_FORMS.PRODUCT.path}>
              <ProductForm />
            </Route>
            <Route path={ROUTE_MENU.DISHES.path}>
              <Dishes />
            </Route>
            <Route path={ROUTE_MENU_FORMS.DISH.path}>
              <DishForm />
            </Route>
            <Route path={ROUTE_MENU.INGREDIENTS.path}>
              <Ingredients />
            </Route>
            <Route path={ROUTE_MENU_FORMS.INGREDIENT.path}>
              <IngredientForm />
            </Route>
            <Route path={ROUTE_MENU.CATEGORIES.path}>
              <Categories />
            </Route>
            <Route path={ROUTE_WAREHOUSE.STOCK.path}>
              <Stock />
            </Route>
            <Route path={ROUTE_WAREHOUSE.SUPPLIES.path}>
              <Supplies />
            </Route>
            <Route path={ROUTE_ACCESS.EMPLOYEES.path}>
              <Employees />
            </Route>
            <Route path={ROUTE_SETTINGS.GENERAL.path}>
              <General />
            </Route>
            <Route path={ROUTE_SETTINGS.BILLING.path}>
              <Subscription />
            </Route>
            <Route path={ROUTE_SETTINGS.TABLES.path}>
              <Tables />
            </Route>
          </Flex>
        </Switch>
      </MainTemplate>
    </ChakraProvider>
  </Router>
);

export default App;
