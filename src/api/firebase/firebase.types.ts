import firebase from 'api/firebase/firebase.api';
import { MenuDocument } from 'model/menu/menu';

export type Snapshot = firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>;
export type Documents = firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>;
export type CollectionReference = firebase.firestore.CollectionReference<firebase.firestore.DocumentData>;
export type DocumentReference = firebase.firestore.DocumentReference<firebase.firestore.DocumentData>;

export type DocumentReferenceHolder = {
  fieldName: keyof MenuDocument;
  collectionName: string;
  documents?: MenuDocument[];
};

export type UploadTask = firebase.storage.UploadTask;
export type StoragePath = 'categories/' | 'dishes/' | 'products/';
