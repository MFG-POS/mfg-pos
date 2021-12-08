import { BaseModel } from 'model/base-model';
import { UnitOfMeasure } from 'model/enums/unit-of-measure';
import { CategoryRead as Category } from 'model/documents/category';

export type Ingredient = BaseModel & {
  name: string;
  unitOfMeasure: UnitOfMeasure;
  supplies: number;
};

export type IngredientRead = BaseModel &
  Ingredient & {
    category: Category;
  };

export type IngredientWrite = Ingredient & {
  category: string;
};
