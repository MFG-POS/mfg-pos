import { MenuDocument } from 'model/menu/menu';
import { isEmpty, isNullOrUndefined } from 'others/helper-functions';
import { BoardTableInstance } from 'model/board/board-table-instance';
import { Order } from 'model/order/order';
import {
  CollectionReference,
  DocumentData,
  DocumentFilter,
  DocumentReference,
  DocumentReferenceHolder,
  Documents,
  DocumentSnapshot,
  Query,
  Snapshot,
  WriteBatch,
} from '../firebase.types';
import { firestore } from '../firebase.api';

export const getCollectionReference = (collection: string) => firestore.collection(collection);

export const getSingle = async <T extends MenuDocument>(collection: string, document: string): Promise<T> => {
  const reference: DocumentReference = firestore.collection(collection).doc(document);
  const snapshot: DocumentData = await reference.get();
  return snapshot.data();
};

export const getSnapshot = async (collection: string, filters?: DocumentFilter[]) => {
  const reference: CollectionReference = getCollectionReference(collection);

  return (!isEmpty(filters)
    ? filters!.reduce<Query>((query, filter) => query.where(filter.fieldPath, filter.opStr, filter.value), reference)
    : reference
  ).get();
};

export const getAll = async <T extends MenuDocument>(
  collection: string,
  references?: DocumentReferenceHolder[],
  filters?: DocumentFilter[],
): Promise<T[]> => {
  const snapshot: Snapshot = await getSnapshot(collection, filters);

  let fetchedReferences: DocumentReferenceHolder[];
  if (!isEmpty(references)) fetchedReferences = await getAllReferences(references!);

  return snapshot.docs.map((data: Documents) => mapDocumentWithReferences<T>(data, fetchedReferences));
};

export const save = async <T>(collection: string, data: T): Promise<DocumentReference> => {
  const reference: CollectionReference = firestore.collection(collection);
  return reference.add(data);
};

export const update = async <T>(collection: string, document: string, data: T): Promise<void> => {
  const reference: DocumentReference = firestore.collection(collection).doc(document);
  return reference.set(data);
};

const mapDocumentWithReferences = <T extends MenuDocument>(data: Documents, references?: DocumentReferenceHolder[]) => {
  const result = {
    id: data.id,
    ...data.data(),
  } as T;

  if (!isEmpty(references))
    references!.forEach((reference) => {
      const nestedDocument = result[reference.fieldName] as MenuDocument;
      if (!isNullOrUndefined(nestedDocument) && !isEmpty(reference.documents)) {
        const foundDocument = reference.documents!.find((document) => document.id === nestedDocument.id);
        if (!isNullOrUndefined(foundDocument)) (result[reference.fieldName] as MenuDocument) = foundDocument!;
      }
    });

  return result;
};

const getAllReferences = async (references: DocumentReferenceHolder[]): Promise<DocumentReferenceHolder[]> =>
  Promise.all(
    references.map(async (reference) => ({ ...reference, documents: await getAll(reference.collectionName) })),
  );

export const deleteDoc = async (collection: string, document: string): Promise<void> => {
  const reference: DocumentReference = firestore.collection(collection).doc(document);
  await reference.delete();
};

export const getAllOrders = async (filters?: DocumentFilter[]): Promise<Order[]> => {
  const snapshot: Snapshot = await getSnapshot('orders', filters);

  return snapshot.docs.map((document: Documents) => {
    const documentData = document.data();
    return {
      id: document.id,
      ...document.data(),
      ...(documentData.startDate && { startDate: documentData.startDate.toDate() }),
      ...(documentData.closureDate && { closureDate: documentData.closureDate.toDate() }),
    } as Order;
  });
};

export const getOrder = async (id: string): Promise<Order> => {
  const reference: CollectionReference = firestore.collection('orders');
  const document: DocumentSnapshot = await reference.doc(id).get();
  return {
    id: document.id,
    ...document.data(),
  } as Order;
};

export const saveOrder = async (order: Partial<Order>): Promise<DocumentReference> => {
  const reference: CollectionReference = firestore.collection('orders');
  return reference.add(order);
};

export const updateOrder = async (id: string, order: Partial<Order>): Promise<void> => {
  const reference: CollectionReference = firestore.collection('orders');
  return reference.doc(id).update(order);
};

export const removeOrder = async (id: string): Promise<void> => {
  const reference: CollectionReference = firestore.collection('orders');
  return reference.doc(id).delete();
};

export const getTables = async (): Promise<BoardTableInstance[]> => {
  const reference: CollectionReference = firestore.collection('tables');
  const snapshot: Snapshot = await reference.get();
  return snapshot.docs.map(
    (document) =>
      ({
        id: document.id,
        ...document.data(),
      } as BoardTableInstance),
  );
};

export const updateTable = async (id: string, table: Partial<BoardTableInstance>): Promise<void> => {
  const reference: CollectionReference = firestore.collection('tables');
  return reference.doc(id).update(table);
};

export const updateTables = async (tables: BoardTableInstance[]): Promise<void> => {
  const reference: CollectionReference = firestore.collection('tables');
  const batch: WriteBatch = firestore.batch();
  tables.forEach((table) => batch.set(reference.doc(table.id), table));
  return batch.commit();
};
