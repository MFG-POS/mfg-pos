import { DocumentReferenceHolder } from 'api/firebase/firebase.types';

export const taxes: DocumentReferenceHolder = {
  fieldName: 'tax',
  collectionName: 'taxes',
};

export const categories: DocumentReferenceHolder = {
  fieldName: 'category',
  collectionName: 'categories',
};

export const taxesAndCategories = [taxes, categories];
