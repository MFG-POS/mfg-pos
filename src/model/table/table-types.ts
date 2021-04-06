import { Article } from 'model/documents/article';
import { Recipe } from 'model/documents/recipe';
import { Category } from 'model/documents/category';
import { Ingredient } from 'model/documents/ingredient';
import { Tax } from 'model/documents/tax';
import { TableDocument } from './table-definitions';

export type TableArticle = Article & TableDocument<Article>;
export type TableRecipe = Recipe & TableDocument<Recipe>;
export type TableCategory = Category & TableDocument<Category>;
export type TableIngredient = Ingredient & TableDocument<Ingredient>;
export type TableTax = Tax & TableDocument<Tax>;
