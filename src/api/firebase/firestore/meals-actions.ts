import { firestore } from 'api/firebase/firebase.api';
import { Firestore } from 'api/firebase/firebase.types';

export const getFirestoreDocs = async (
  collection: string,
): Promise<Firestore['Doc'][]> => {
  const querySnaphot = await firestore.collection(collection).get();
  return querySnaphot.docs;
};
