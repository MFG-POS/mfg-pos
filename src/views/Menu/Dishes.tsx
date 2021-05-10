import { Heading, Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { ROUTE_MENU_FORMS } from 'routing';

const Dishes = () => (
  <>
    <Heading>MOCK: Dania</Heading>
    <Link as={RouterLink} to={ROUTE_MENU_FORMS.DISH.path}>
      Formularz
    </Link>
  </>
);

export default Dishes;
