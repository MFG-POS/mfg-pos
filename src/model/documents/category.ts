import { BaseModel } from '../base-model';

export interface Category extends BaseModel {
  imagePath: string;
  name: string;
  parent?: Category;
}
