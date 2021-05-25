import { BaseModel } from 'model/base-model';
import { Tax } from './tax';

export type Category = BaseModel & {
  name: string;
  // parent?: Category; TODO: Fix circularly referenced type error
  tax?: Tax;
  image: string | FileList;
};
