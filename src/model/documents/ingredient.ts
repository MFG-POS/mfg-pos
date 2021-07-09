import { BaseModel } from 'model/base-model';
import { UnitOfMeasure } from 'model/enums/unit-of-measure';

export type Ingredient = BaseModel & {
  name: string;
  unitOfMeasure: UnitOfMeasure;
  supplies: number;
};
