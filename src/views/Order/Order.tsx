import { Dispatch, SetStateAction, useState } from 'react';
import OrderTerminal from 'components/organisms/OrderTerminal';
import OrderFinalization from 'components/organisms/OrderFinalization';
import { OrderState } from 'model/order/order-state';
import { OrderSummaryItem } from 'model/order/order-types';

export type OrderStateProps = {
  setOrderState: Dispatch<SetStateAction<OrderState>>;
};

const Order = () => {
  const [state, setState] = useState<OrderState>(OrderState.TERMINAL);
  const [summaryItems, setSummaryItems] = useState<OrderSummaryItem[]>([]);

  return state === OrderState.FINALIZATION ? (
    <OrderFinalization
      sum={summaryItems.reduce((actual, previous) => actual + previous.sum, 0).toFixed(2)}
      setOrderState={setState}
    />
  ) : (
    <OrderTerminal summaryItems={summaryItems} setSummaryItems={setSummaryItems} setOrderState={setState} />
  );
};

export default Order;
