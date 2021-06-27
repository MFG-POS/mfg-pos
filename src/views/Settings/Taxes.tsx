import { Heading, Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { ROUTE_SETTINGS_FORMS } from 'routing';

const Taxes = () => (
  <>
    <Heading>MOCK: Podatki</Heading>
    <Link as={RouterLink} to={ROUTE_SETTINGS_FORMS.TAX.path} color="gray.500">
      {ROUTE_SETTINGS_FORMS.TAX.name}
    </Link>
  </>
);

export default Taxes;
