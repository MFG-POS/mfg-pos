/* eslint-disable max-len */
import firebase from 'api/firebase/firebase.api';

export type Firestore = {
  Doc: firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>;
};

// Interface for sample documents inside sample collection called "meals"
export interface Meals {
  id: string;
  name: string;
  ingredients: [{ ingredient: string; portion: string }];
}
