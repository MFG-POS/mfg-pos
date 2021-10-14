import firebase from 'api/firebase/firebase.api';
import { CommonDocument } from 'model/documents/common';

export type DocumentData = firebase.firestore.DocumentData;
export type Snapshot = firebase.firestore.QuerySnapshot<DocumentData>;
export type DocumentSnapshot = firebase.firestore.DocumentSnapshot<DocumentData>;
export type Documents = firebase.firestore.QueryDocumentSnapshot<DocumentData>;
export type CollectionReference = firebase.firestore.CollectionReference<DocumentData>;
export type DocumentReference = firebase.firestore.DocumentReference<DocumentData>;
export type WriteBatch = firebase.firestore.WriteBatch;
export type FieldValue = firebase.firestore.FieldValue;
export type Timestamp = firebase.firestore.Timestamp;

export type DocumentReferenceHolder = {
  fieldName: keyof CommonDocument;
  collectionName: string;
  documents?: CommonDocument[];
};

export type UploadTask = firebase.storage.UploadTask;
export type StoragePath = 'categories/' | 'dishes/' | 'products/';
