import { Flex } from '@chakra-ui/react';

type OrderKeyboardElementProps = {
  element: string;
  onClick: (element: string) => void;
};

const OrderKeyboardElement = ({ element, onClick }: OrderKeyboardElementProps) => (
  <Flex
    onMouseDown={(event) => event.preventDefault()}
    onClick={() => onClick(element)}
    justifyContent="center"
    alignItems="center"
    cursor="pointer"
    borderRadius="5px"
    fontSize="1.4rem"
    bg="gray.100"
    _hover={{
      bg: 'gray.200',
    }}
  >
    {element}
  </Flex>
);

export default OrderKeyboardElement;
