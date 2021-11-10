import { Grid } from '@chakra-ui/react';

import Sidebar from 'components/organisms/Sidebar';
import { useLocation } from 'react-router-dom';

type MainTemplateProps = {
  readonly children: React.ReactNode;
};

const MainTemplate = ({ children }: MainTemplateProps) => {
  const location = useLocation();
  return location.pathname === '/' || location.pathname === '/login' ? (
    <>{children}</>
  ) : (
    <Grid templateColumns="250px 1fr">
      <Sidebar />
      {children}
    </Grid>
  );
};

export default MainTemplate;
