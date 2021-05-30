import { Category } from 'model/documents/category';
import { Dish } from 'model/documents/dish';
import { Ingredient } from 'model/documents/ingredient';
import { Product } from 'model/documents/products';
import { Tax } from 'model/documents/tax';

type Optional<Type> = {
  [Property in keyof Type]+?: Type[Property];
};

export type MenuForm = Category | Dish | Ingredient | Product | Tax;
export type MenuDocument = Optional<Category & Dish & Ingredient & Product & Tax>;
