import { BaseObject } from 'model/base-object';
import { CollectionReference, Documents, Snapshot } from '../firebase.types';
import { firestore } from '../firebase.api';

export const getAll = async <T extends BaseObject>(collection: string): Promise<T[]> => {
  const reference: CollectionReference = firestore.collection(collection);
  const snapshot: Snapshot = await reference.get();

  return (snapshot.docs.map((data: Documents) => ({
    id: data.id,
    ...data.data(),
  })) as unknown) as T[];
};
