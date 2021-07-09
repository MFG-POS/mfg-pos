import React from 'react';
import { BoardTableInstance } from 'model/board/board-table-instance';
import { Box } from '@chakra-ui/react';
import OrderTable from '../OrderTable';

type OrderTablesProps = {
  tables: BoardTableInstance[];
  navigateToOrder: (orderId: string) => void;
  setGuests: (id: string, value: string) => void;
};

const OrderTables = ({ tables, navigateToOrder, setGuests }: OrderTablesProps) => (
  <Box w="100%" h="100%" position="relative">
    {tables &&
      tables.map((table) => {
        const { id, left, top, seats, height, width, borderRadius, orderId, orderGuests } = table;
        return (
          <OrderTable
            key={id}
            id={id}
            orderId={orderId}
            orderGuests={orderGuests}
            left={left}
            top={top}
            height={height}
            width={width}
            borderRadius={borderRadius}
            seats={seats}
            navigateToOrder={navigateToOrder}
            setGuests={setGuests}
          />
        );
      })}
  </Box>
);

export default OrderTables;
