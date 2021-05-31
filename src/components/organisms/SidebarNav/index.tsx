import { Accordion } from '@chakra-ui/react';
import { FaChartBar, FaHamburger, FaDolly, FaLockOpen, FaWrench } from 'react-icons/fa';

import { ROUTE_ACCESS, ROUTE_MENU, ROUTE_SETTINGS, ROUTE_STATS, ROUTE_WAREHOUSE } from 'routing';

import NavGroup from 'components/molecules/NavGroup';

const SidebarNav = () => (
  <>
    <Accordion allowToggle w="100%" flexGrow={1} as="nav">
      <NavGroup title="Statystyki" links={Object.values(ROUTE_STATS)} icon={FaChartBar} />
      <NavGroup title="Menu" links={Object.values(ROUTE_MENU)} icon={FaHamburger} />
      <NavGroup title="Magazyn" links={Object.values(ROUTE_WAREHOUSE)} icon={FaDolly} />
      <NavGroup title="Dostęp" links={Object.values(ROUTE_ACCESS)} icon={FaLockOpen} />
      <NavGroup title="Ustawienia" links={Object.values(ROUTE_SETTINGS)} icon={FaWrench} />
    </Accordion>
  </>
);

export default SidebarNav;
