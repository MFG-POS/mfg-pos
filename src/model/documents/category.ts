import { BaseModel } from 'model/base-model';

export interface Category extends BaseModel {
  name: string;
  parent?: Category;
  tax?: string[];
  image: string | FileList;
}
