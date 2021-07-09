import React, { useEffect, useState } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import OrderTables from 'components/molecules/Order/OrderTables';
import { BoardTableInstance } from 'model/board/board-table-instance';
import { getTables, saveOrder, updateTable } from 'api/firebase/firestore/firestore-actions';
import { useHistory } from 'react-router-dom';

const OrderBoard = () => {
  const history = useHistory();

  const [tables, setTables] = useState<BoardTableInstance[]>([]);

  useEffect(() => {
    getTables().then((retrievedTables) => setTables(retrievedTables));
  }, []);

  const getTable = (id: string): BoardTableInstance => tables.find((table) => table.id === id)!;
  const navigateToOrder = (orderId: string) => history.push(`/orders/${orderId}/`);

  const createOrder = (tableId: string, guestsCount: string) => {
    const guests = Number(guestsCount);

    saveOrder({
      guestsCount: guests,
      closed: false,
      startDate: new Date(),
      tableId,
    }).then((order) =>
      updateTable(tableId, { ...getTable(tableId), orderId: order.id, orderGuests: guests }).then(() =>
        navigateToOrder(order.id),
      ),
    );
  };

  return (
    <Flex direction="column" h="70vh" w="140vh" p="5">
      <Box h="85%" bg="gray.100">
        <OrderTables tables={tables} navigateToOrder={navigateToOrder} setGuests={createOrder} />
      </Box>
    </Flex>
  );
};

export default OrderBoard;
