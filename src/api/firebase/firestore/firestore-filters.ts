import { DocumentFilter } from 'api/firebase/firebase.types';
import { getCollectionReference } from 'api/firebase/firestore/firestore-actions';
import { endOfDay, startOfDay } from 'date-fns';

export const categoriesOfIngredients: DocumentFilter[] = [{ fieldPath: 'kind', opStr: '==', value: 'INGREDIENTS' }];
export const categoriesOfProductsAndDishes: DocumentFilter[] = [
  {
    fieldPath: 'kind',
    opStr: '==',
    value: 'PRODUCTS_AND_DISHES',
  },
];

export const parentFilters = (fieldPath: string, collection: string, id: string | null): DocumentFilter[] => [
  {
    fieldPath,
    value: id != null ? getCollectionReference(collection).doc(id) : null,
    opStr: '==',
  },
];

export const closedOrders = (startDate: Date, endDate: Date): DocumentFilter[] => [
  {
    fieldPath: 'closureDate',
    opStr: '>=',
    value: startOfDay(startDate),
  },
  {
    fieldPath: 'closureDate',
    opStr: '<=',
    value: endOfDay(endDate),
  },
];
