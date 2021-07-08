import { OrderSummaryItem } from 'model/order/order-types';
import { Timestamp } from 'api/firebase/firebase.types';

export type Order = {
  id: string;
  tableId: string;
  closed: boolean;
  closedWithoutPayment: boolean;
  guestsCount: number;
  total: number;
  cash: number;
  card: number;
  startDate: Date | Timestamp;
  closureDate: Date | Timestamp;
  items: OrderSummaryItem[];
};
