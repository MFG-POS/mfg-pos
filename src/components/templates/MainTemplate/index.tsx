import { Grid } from '@chakra-ui/react';
import Sidebar from 'components/organisms/Sidebar';
import { useAuth } from 'auth/AuthContext';
import { ReactNode } from 'react';

type MainTemplateProps = {
  readonly children: ReactNode;
};

const MainTemplate = ({ children }: MainTemplateProps) => {
  const { currentUser, isUnclassified } = useAuth();

  return !currentUser || isUnclassified ? (
    <>{children}</>
  ) : (
    <Grid templateColumns="250px 1fr">
      <Sidebar />
      {children}
    </Grid>
  );
};

export default MainTemplate;
