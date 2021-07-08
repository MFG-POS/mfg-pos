import { MenuDocument } from 'model/menu/menu';
import { isEmpty, isNullOrUndefined } from 'others/helper-functions';
import {
  CollectionReference,
  DocumentData,
  DocumentReference,
  DocumentReferenceHolder,
  Documents,
  Snapshot,
} from '../firebase.types';
import { firestore } from '../firebase.api';

export const getCollectionReference = (collection: string) => firestore.collection(collection);

export const getAllByParent = async <T extends MenuDocument>(
  collection: string,
  parentCollection: string,
  parentFieldPath: string,
  parentId?: string,
): Promise<T[]> => {
  const reference: CollectionReference = getCollectionReference(collection);
  const snapshot: Snapshot = await (parentId !== undefined
    ? reference.where(parentFieldPath, '==', getCollectionReference(parentCollection).doc(parentId))
    : reference.where(parentFieldPath, '==', null)
  ).get();

  return snapshot.docs.map((data: Documents) => mapDocumentWithReferences<T>(data, []));
};

export const getSingle = async <T extends MenuDocument>(collection: string, document: string): Promise<T> => {
  const reference: DocumentReference = firestore.collection(collection).doc(document);
  const snapshot: DocumentData = await reference.get();
  return snapshot.data();
};

export const getAll = async <T extends MenuDocument>(
  collection: string,
  references?: DocumentReferenceHolder[],
): Promise<T[]> => {
  const reference: CollectionReference = firestore.collection(collection);
  const snapshot: Snapshot = await reference.get();

  let fetchedReferences: DocumentReferenceHolder[];
  if (!isEmpty(references)) fetchedReferences = await getAllReferences(references!);

  return snapshot.docs.map((data: Documents) => mapDocumentWithReferences<T>(data, fetchedReferences));
};

export const save = async <T>(collection: string, data: T): Promise<DocumentReference> => {
  const reference: CollectionReference = firestore.collection(collection);
  return reference.add(data);
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
