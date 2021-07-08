import { OrderSummaryItem } from 'model/order/order-types';
import { isNullOrUndefined } from 'others/helper-functions';

export const saveSummaryItems = (id: string, items: OrderSummaryItem[]) => {
  localStorage.setItem(id, JSON.stringify(items));
};

export const getSummaryItems = (id: string): OrderSummaryItem[] => {
  const item: string | null = localStorage.getItem(id);
  return isNullOrUndefined(item) ? [] : JSON.parse(item!);
};

export const removeSummaryItems = (id: string) => {
  localStorage.removeItem(id);
};
