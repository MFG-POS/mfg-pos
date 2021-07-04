import { v4 as uuidv4 } from 'uuid';

import { storage, storageEventState, storageTaskState } from '../firebase.api';
import { StoragePath, UploadTask } from '../firebase.types';

const monitorBatchUpload = <T>(task: UploadTask, cb: (url: string) => Promise<T>) => {
  task.on(
    storageEventState.STATE_CHANGED,
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log(`Upload is ${progress}% done`);

      switch (snapshot.state) {
        case storageTaskState.PAUSED: // or 'paused'
          console.log('Upload is paused');
          break;
        case storageTaskState.RUNNING: // or 'running'
          console.log('Upload is running');
          break;
      }
    },
    (error) => {
      switch (error.code) {
        case 'storage/unauthorized':
          console.error('Unauthorized access.');
          break;
        case 'storage/canceled':
          console.error('Upload was canceled, please retry.');
          break;
        case 'storage/unknown':
          console.error('Upload failed. Check if files are not malformed and please retry.');
          break;
      }
    },
    () => {
      task.snapshot.ref.getDownloadURL().then((downloadURL: string) => cb(downloadURL));
    },
  );
};

export const store = <T>(path: StoragePath, file: File, cb: (url: string) => Promise<T>) => {
  const uploadTask = storage.ref(`${path}${uuidv4()}`).put(file);
  monitorBatchUpload(uploadTask, cb);
};
