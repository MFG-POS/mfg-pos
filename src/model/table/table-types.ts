import { Product } from 'model/documents/products';
import { Dish } from 'model/documents/dish';
import { CategoryRead as Category } from 'model/documents/category';
import { Ingredient } from 'model/documents/ingredient';
import { Tax } from 'model/documents/tax';
import { BaseObject } from 'model/base-object';
import { UserDetails } from 'model/auth/user-details';
import { TableDocument } from './table-definitions';

export type TableProduct = Product & TableDocument<Product> & BaseObject;
export type TableDish = Dish & TableDocument<Dish> & BaseObject;
export type TableCategory = Category & TableDocument<Category> & BaseObject;
export type TableIngredient = Ingredient & TableDocument<Ingredient> & BaseObject;
export type TableTax = Tax & TableDocument<Tax> & BaseObject;
export type TableUser = UserDetails & TableDocument<UserDetails> & BaseObject;
