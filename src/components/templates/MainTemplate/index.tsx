import { Grid } from '@chakra-ui/react';

import Sidebar from 'components/organisms/Sidebar';

type MainTemplateProps = {
  readonly children: React.ReactNode;
};

const MainTemplate = ({ children }: MainTemplateProps) => (
  <Grid templateColumns="250px 1fr">
    <Sidebar />
    {children}
  </Grid>
);

export default MainTemplate;
