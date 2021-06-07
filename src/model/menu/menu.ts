import { Category } from 'model/documents/category';
import { Dish } from 'model/documents/dish';
import { Ingredient } from 'model/documents/ingredient';
import { Product } from 'model/documents/products';
import { Tax } from 'model/documents/tax';

export type MenuForm = Category | Dish | Ingredient | Product | Tax;
export type MenuDocument = Partial<Category & Dish & Ingredient & Product & Tax>;
