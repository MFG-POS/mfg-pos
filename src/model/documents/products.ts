import { BaseModel } from 'model/base-model';
import { Category } from './category';
import { Tax } from './tax';

export interface Product extends BaseModel {
  name: string;
  category: Category;
  netPrice: number;
  overhead: number;
  grossPrice: number;
  tax: Tax;
  image: string | FileList;
}
