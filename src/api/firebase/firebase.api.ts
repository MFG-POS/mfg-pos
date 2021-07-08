/* eslint-disable import/no-duplicates */

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import { firebaseConfig } from './firebase.config';

firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();
export const deleteFieldValue = firebase.firestore.FieldValue.delete();

export const storageTaskState = firebase.storage.TaskState;
export const storageEventState = firebase.storage.TaskEvent;

export default firebase;
