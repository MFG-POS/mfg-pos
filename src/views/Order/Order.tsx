import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import OrderTerminal from 'components/organisms/OrderTerminal';
import OrderFinalization from 'components/organisms/OrderFinalization';
import { OrderState } from 'model/order/order-state';
import { OrderSummaryItem } from 'model/order/order-types';
import { useHistory, useParams } from 'react-router-dom';
import { getOrder, removeOrder, updateOrder, updateTable } from 'api/firebase/firestore/firestore-actions';
import { Order as OrderModel } from 'model/order/order';
import { getSummaryItems, removeSummaryItems, saveSummaryItems } from 'others/order-storage';
import { useNonInitialEffect } from 'others/use-non-initial-effect';
import { useToast } from '@chakra-ui/react';
import { orderBoardPath } from 'routing';
import { deleteFieldValue } from 'api/firebase/firebase.api';

export type OrderStateProps = {
  order: OrderModel;
  setOrderState: Dispatch<SetStateAction<OrderState>>;
};

const Order = () => {
  const toast = useToast();
  const history = useHistory();
  const { id } = useParams<{ id: string }>();

  const [order, setOrder] = useState<OrderModel | null>(null);
  const [state, setState] = useState<OrderState>(OrderState.TERMINAL);
  const [summaryItems, setSummaryItems] = useState<OrderSummaryItem[]>([]);

  useEffect(() => {
    getOrder(id).then((databaseOrder) => {
      setOrder(databaseOrder);
      setSummaryItems(getSummaryItems(id));
    });
  }, [id]);

  useNonInitialEffect(() => {
    saveSummaryItems(id, summaryItems);
  }, [summaryItems]);

  const closeOrder = (total: number, cash: number, card: number, withoutPayment: boolean) => {
    updateOrder(id, {
      ...order,
      total,
      cash,
      card,
      closed: true,
      closedWithoutPayment: withoutPayment,
      closureDate: new Date(),
      items: summaryItems,
    }).then(() =>
      updateTable(order!.tableId, { orderId: deleteFieldValue, orderGuests: deleteFieldValue }).then(() => {
        toast({
          title: 'Zamówienie zostało zamknięte 🙌',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        history.push(orderBoardPath);
        removeSummaryItems(order!.id);
      }),
    );
  };

  const cancelOrder = () => {
    removeOrder(id).then(() =>
      updateTable(order!.tableId, { orderId: deleteFieldValue, orderGuests: deleteFieldValue }).then(() => {
        toast({
          title: 'Zamówienie zostało anulowane 🙌',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        history.push(orderBoardPath);
        removeSummaryItems(order!.id);
      }),
    );
  };

  return (
    order &&
    (state === OrderState.FINALIZATION ? (
      <OrderFinalization
        order={order}
        sum={summaryItems.reduce((actual, previous) => actual + previous.sum, 0).toFixed(2)}
        setOrderState={setState}
        closeOrder={closeOrder}
      />
    ) : (
      <OrderTerminal
        order={order}
        summaryItems={summaryItems}
        setSummaryItems={setSummaryItems}
        setOrderState={setState}
        cancelOrder={cancelOrder}
      />
    ))
  );
};

export default Order;
