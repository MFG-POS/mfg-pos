import { Heading, Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { ROUTE_MENU_FORMS } from 'routing';

const Products = () => (
  <>
    <Heading>MOCK: Artykuły</Heading>
    <Link as={RouterLink} to={ROUTE_MENU_FORMS.PRODUCT.path}>
      Formularz
    </Link>
  </>
);

export default Products;
