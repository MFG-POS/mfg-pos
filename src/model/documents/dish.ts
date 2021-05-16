import { BaseModel } from 'model/base-model';
import { Category } from './category';
import { Tax } from './tax';

export interface Dish extends BaseModel {
  name: string;
  category: Category;
  netPrice: number;
  grossPrice: number;
  netWeight: number;
  overhead: number;
  tax: Tax;
  image: string | FileList;
}
