import { Heading, Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { ROUTE_MENU_FORMS } from 'routing';

const Categories = () => (
  <>
    <Heading>MOCK: Kategorie</Heading>
    <Link as={RouterLink} to={ROUTE_MENU_FORMS.CATEGORY.path}>
      Formularz
    </Link>
  </>
);

export default Categories;
