import { MenuDocument } from 'model/menu/menu';
import { isEmpty, isNullOrUndefined } from 'others/helper-functions';
import { CollectionReference, DocumentReferenceHolder, Documents, Snapshot } from '../firebase.types';
import { firestore } from '../firebase.api';

export const getAll = async <T extends MenuDocument>(
  collection: string,
  references?: DocumentReferenceHolder[],
): Promise<T[]> => {
  const reference: CollectionReference = firestore.collection(collection);
  const snapshot: Snapshot = await reference.get();

  let fetchedReferences: DocumentReferenceHolder[];
  if (references !== undefined && !isEmpty(references)) fetchedReferences = await getAllReferences(references);

  return snapshot.docs.map((data: Documents) => mapDocumentWithReferences<T>(data, fetchedReferences));
};

const mapDocumentWithReferences = <T extends MenuDocument>(data: Documents, references?: DocumentReferenceHolder[]) => {
  const result = {
    id: data.id,
    ...data.data(),
  } as T;

  if (references !== undefined && !isEmpty(references))
    references.forEach((reference) => {
      const nestedDocument = result[reference.fieldName] as MenuDocument;
      if (!isNullOrUndefined(nestedDocument) && reference.documents !== undefined && !isEmpty(reference.documents)) {
        const foundDocument = reference.documents.find((document) => document.id === nestedDocument.id);
        if (foundDocument !== undefined) (result[reference.fieldName] as MenuDocument) = foundDocument;
      }
    });

  return result;
};

const getAllReferences = async (references: DocumentReferenceHolder[]): Promise<DocumentReferenceHolder[]> =>
  Promise.all(
    references.map(async (reference) => ({ ...reference, documents: await getAll(reference.collectionName) })),
  );
