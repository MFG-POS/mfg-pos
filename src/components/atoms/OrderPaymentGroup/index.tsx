import { Flex, Heading } from '@chakra-ui/react';
import { ReactNode } from 'react';

type OrderPaymentGroupProps = {
  text: string;
  readonly component: ReactNode;
};

const OrderPaymentGroup = ({ text, component }: OrderPaymentGroupProps) => (
  <Flex direction="row" justifyContent="space-between" alignItems="center" w="80%" p="1.4rem">
    <Heading as="h4" size="md">
      {text}
    </Heading>
    {component}
  </Flex>
);

export default OrderPaymentGroup;
