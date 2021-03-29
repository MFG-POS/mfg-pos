import { TableDocument } from './table-definitions';
import { Article } from '../documents/article';
import { Recipe } from '../documents/recipe';
import { Category } from '../documents/category';
import { Ingredient } from '../documents/ingredient';
import { Tax } from '../documents/tax';

export type TableArticle = Article & TableDocument<Article>;
export type TableRecipe = Recipe & TableDocument<Recipe>;
export type TableCategory = Category & TableDocument<Category>;
export type TableIngredient = Ingredient & TableDocument<Ingredient>;
export type TableTax = Tax & TableDocument<Tax>;
