import { ButtonGroup } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { commonChakraProps } from 'others/theme';

type ButtonGroupTemplateProps = {
  py: string;
  readonly children: ReactNode;
};

const ButtonGroupTemplate = ({ py, children }: ButtonGroupTemplateProps) => (
  <ButtonGroup {...commonChakraProps} py={py}>
    {children}
  </ButtonGroup>
);

export default ButtonGroupTemplate;
