import { BaseModel } from '../base-model';
import { UnitOfMeasure } from '../enums/unit-of-measure';
import { Category } from './category';

export interface Ingredient extends BaseModel {
  imagePath: string;
  name: string;
  category: Category;
  unitOfMeasure: UnitOfMeasure;
  supplies: number;
}
