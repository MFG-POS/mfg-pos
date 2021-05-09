import { Stack } from '@chakra-ui/react';
import Logo from 'components/atoms/Logo';
import SidebarNav from 'components/organisms/SidebarNav';

const Sidebar = () => (
  <Stack minH="100vh" bg="gray.50" alignItems="flex-start" borderRight="1px" borderColor="gray.200">
    <Logo isLink />
    <SidebarNav />
  </Stack>
);

export default Sidebar;
