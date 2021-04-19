import { BaseModel } from '../base-model';
import { Category } from './category';
import { Tax } from './tax';

export interface Recipe extends BaseModel {
  imagePath: string;
  name: string;
  category: Category;
  netPrice: number;
  grossPrice: number;
  netWeight: number;
  overhead: number;
  tax: Tax;
}
