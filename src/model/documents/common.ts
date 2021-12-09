import { CategoryRead as Category } from 'model/documents/category';
import { Dish } from 'model/documents/dish';
import { Ingredient } from 'model/documents/ingredient';
import { Product } from 'model/documents/products';
import { Tax } from 'model/documents/tax';
import { UserDetails } from 'model/auth/user-details';

export type CommonDocument = Partial<Category & Dish & Ingredient & Product & Tax & UserDetails>;
