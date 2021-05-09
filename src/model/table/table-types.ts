import { Product } from 'model/documents/products';
import { Dish } from 'model/documents/dish';
import { Category } from 'model/documents/category';
import { Ingredient } from 'model/documents/ingredient';
import { Tax } from 'model/documents/tax';
import { TableDocument } from './table-definitions';

export type TableProduct = Product & TableDocument<Product>;
export type TableDish = Dish & TableDocument<Dish>;
export type TableCategory = Category & TableDocument<Category>;
export type TableIngredient = Ingredient & TableDocument<Ingredient>;
export type TableTax = Tax & TableDocument<Tax>;
