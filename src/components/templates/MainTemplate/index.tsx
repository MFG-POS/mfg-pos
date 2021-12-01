import { Grid } from '@chakra-ui/react';

import Sidebar from 'components/organisms/Sidebar';
import { useLocation, useHistory } from 'react-router-dom';

type MainTemplateProps = {
  readonly children: React.ReactNode;
};

const MainTemplate = ({ children }: MainTemplateProps) => {
  const location = useLocation();
  if (
    String(location.pathname) == '/' ||
    String(location.pathname) == '/login' ||
    String(location.pathname) == '/dashboard' ||
    String(location.pathname) == '/orders/board/' ||
    String(location.pathname) == '/orders/:id/' ||
    String(location.pathname) == '/statistics/sales/' ||
    String(location.pathname) == '/menu/products/' ||
    String(location.pathname) == '/menu/dishes/' ||
    String(location.pathname) == '/menu/ingredients/' ||
    String(location.pathname) == '/menu/categories/' ||
    String(location.pathname) == '/menu/product-form/' ||
    String(location.pathname) == '/menu/dish-form/' ||
    String(location.pathname) == '/menu/ingredient-form/' ||
    String(location.pathname) == '/menu/category-form/' ||
    String(location.pathname) == '/warehouse/stock/' ||
    String(location.pathname) == '/warehouse/supplies/' ||
    String(location.pathname) == '/menu/accesses/' ||
    String(location.pathname) == '/menu/accessform/' ||
    String(location.pathname) == '/settings/taxes/' ||
    String(location.pathname) == '/settings/tables/' ||
    String(location.pathname) == '/settings/tax-form/'
  ) {
    return location.pathname === '/' || location.pathname === '/login' ? (
      <>{children}</>
    ) : (
      <Grid templateColumns="250px 1fr">
        <Sidebar />
        {children}
      </Grid>
    );
  }
  window.location.replace('http://localhost:3000/');
  return <>{children}</>;
};

export default MainTemplate;
