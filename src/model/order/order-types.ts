import { CategoryRead as Category } from 'model/documents/category';
import { Dish } from 'model/documents/dish';
import { Product } from 'model/documents/products';

export const isSummaryDocument = (document: OrderDocument): document is Dish | Product =>
  !!(document as Dish).grossPrice;

export type OrderDocument = Category | Dish | Product;

export type OrderSummaryItem = {
  document: Product | Dish;
  count: number;
  sum: number;
};
