import firebase from 'api/firebase/firebase.api';

export type Snapshot = firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>;
export type Documents = firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>;
export type CollectionReference = firebase.firestore.CollectionReference<firebase.firestore.DocumentData>;

// Interface for sample documents inside sample collection called "meals"
export interface Meal {
  id: string;
  name: string;
  ingredients: [{ ingredient: string; portion: string }];
}
