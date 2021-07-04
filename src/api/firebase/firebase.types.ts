import firebase from 'api/firebase/firebase.api';
import { MenuDocument } from 'model/menu/menu';

export type Snapshot = firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>;
export type DocumentSnapshot = firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>;
export type Documents = firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>;
export type CollectionReference = firebase.firestore.CollectionReference<firebase.firestore.DocumentData>;
export type DocumentReference = firebase.firestore.DocumentReference<firebase.firestore.DocumentData>;
export type DocumentData = firebase.firestore.DocumentData;
export type WriteBatch = firebase.firestore.WriteBatch;
export type FieldValue = firebase.firestore.FieldValue;

export type DocumentReferenceHolder = {
  fieldName: keyof MenuDocument;
  collectionName: string;
  documents?: MenuDocument[];
};
