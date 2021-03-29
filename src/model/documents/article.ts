import { BaseModel } from '../base-model';
import { Category } from './category';
import { Tax } from './tax';

export interface Article extends BaseModel {
  imagePath: string;
  name: string;
  category: Category;
  netPrice: number;
  grossPrice: number;
  overhead: number;
  tax: Tax;
}
