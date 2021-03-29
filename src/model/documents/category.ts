import { BaseModel } from '../base-model';
import { CategoryType } from '../enums/category-type';

export interface Category extends BaseModel {
  imagePath: string;
  name: string;
  type: CategoryType;
}
