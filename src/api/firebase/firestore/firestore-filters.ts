import { DocumentFilter } from 'api/firebase/firebase.types';

export const categoriesOfIngredients: DocumentFilter[] = [{ fieldPath: 'kind', opStr: '==', value: 'INGREDIENTS' }];
export const categoriesOfProductsAndDishes: DocumentFilter[] = [
  {
    fieldPath: 'kind',
    opStr: '==',
    value: 'PRODUCTS_AND_DISHES',
  },
];
