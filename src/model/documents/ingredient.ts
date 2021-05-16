import { BaseModel } from 'model/base-model';
import { UnitOfMeasure } from 'model/enums/unit-of-measure';

export interface Ingredient extends BaseModel {
  name: string;
  unitOfMeasure: UnitOfMeasure;
  supplies: number;
}
