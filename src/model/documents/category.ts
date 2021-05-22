import { BaseModel } from 'model/base-model';
import { Tax } from './tax';

export interface Category extends BaseModel {
  name: string;
  parent?: Category;
  tax?: Tax;
  image: string | FileList;
}
