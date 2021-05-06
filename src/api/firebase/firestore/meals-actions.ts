import { firestore } from 'api/firebase/firebase.api';
import { Documents } from 'api/firebase/firebase.types';

export const getFirestoreDocs = async (collection: string): Promise<Documents[]> => {
  const querySnapshot = await firestore.collection(collection).get();
  return querySnapshot.docs;
};
