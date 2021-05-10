import { Heading, Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { ROUTE_MENU_FORMS } from 'routing';

const Ingredients = () => (
  <>
    <Heading>MOCK: Składniki</Heading>
    <Link as={RouterLink} to={ROUTE_MENU_FORMS.INGREDIENT.path}>
      Formularz
    </Link>
  </>
);

export default Ingredients;
