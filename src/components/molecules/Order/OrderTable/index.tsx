import React from 'react';
import { BoardTableInstance } from 'model/board/board-table-instance';
import { Box, Flex, useDisclosure } from '@chakra-ui/react';
import BoardModal from 'components/atoms/BoardModal';

type OrderTableProps = BoardTableInstance & {
  navigateToOrder: (orderId: string) => void;
  setGuests: (id: string, value: string) => void;
};

const OrderTable = ({
  id,
  left,
  top,
  height,
  width,
  seats,
  setGuests,
  navigateToOrder,
  orderId,
  orderGuests,
}: OrderTableProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      onClick={() => (orderId ? navigateToOrder(orderId as string) : onOpen())}
      bg={orderId ? 'red.300' : 'gray.300'}
      borderColor={orderId ? 'red.500' : 'gray.400'}
      borderWidth="1px"
      borderRadius="12px"
      fontWeight="bold"
      position="absolute"
      cursor="pointer"
      _hover={{ boxShadow: 'md' }}
      width={width}
      height={height}
      left={left}
      top={top}
    >
      <BoardModal id={id} updateSeats={setGuests} isOpen={isOpen} onClose={onClose} />
      <Flex justifyContent="center" alignItems="center" h="100%">
        {orderGuests || seats}
      </Flex>
    </Box>
  );
};

export default OrderTable;
