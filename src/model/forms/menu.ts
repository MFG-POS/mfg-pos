import { Category } from 'model/documents/category';
import { Dish } from 'model/documents/dish';
import { Ingredient } from 'model/documents/ingredient';
import { Product } from 'model/documents/products';

export type MenuForm = Category | Dish | Ingredient | Product;
