import { Grid } from '@chakra-ui/react';

type MainTemplateProps = {
  readonly children: React.ReactNode;
};

const MainTemplate = ({ children }: MainTemplateProps) => <Grid templateColumns="250px 1fr">{children}</Grid>;

export default MainTemplate;
