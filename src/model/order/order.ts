import { OrderSummaryItem } from 'model/order/order-types';

export type Order = {
  id: string;
  tableId: string;
  closed: boolean;
  closedWithoutPayment: boolean;
  guestsCount: number;
  total: number;
  cash: number;
  card: number;
  startDate: Date;
  closureDate: Date;
  items: OrderSummaryItem[];
};
