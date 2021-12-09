import { Accordion } from '@chakra-ui/react';
import { FaChartBar, FaHamburger, FaLockOpen, FaShoppingCart, FaWrench } from 'react-icons/fa';

import { ROUTE_ACCESS, ROUTE_BOARD, ROUTE_MENU, ROUTE_SETTINGS, ROUTE_STATS } from 'routing';

import NavGroup from 'components/molecules/NavGroup';
import { useAuth } from 'auth/AuthContext';

const SidebarNav = () => {
  const { isAdmin } = useAuth();

  return (
    <>
      <Accordion allowToggle w="100%" flexGrow={1} as="nav">
        <NavGroup title="Zamówienia" links={Object.values(ROUTE_BOARD)} icon={FaShoppingCart} />
        {isAdmin && <NavGroup title="Statystyki" links={Object.values(ROUTE_STATS)} icon={FaChartBar} />}
        {isAdmin && <NavGroup title="Menu" links={Object.values(ROUTE_MENU)} icon={FaHamburger} />}
        {isAdmin && <NavGroup title="Dostęp" links={Object.values(ROUTE_ACCESS)} icon={FaLockOpen} />}
        {isAdmin && <NavGroup title="Ustawienia" links={Object.values(ROUTE_SETTINGS)} icon={FaWrench} />}
      </Accordion>
    </>
  );
};

export default SidebarNav;
