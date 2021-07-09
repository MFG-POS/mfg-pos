import { BaseModel } from 'model/base-model';
import { Tax } from './tax';

type Category = {
  name: string;
  image: string | FileList;
};

// Workaround for circularly references type error
type ParentCategory = BaseModel &
  Category & {
    tax?: Tax;
  };

export type CategoryRead = BaseModel &
  Category & {
    parent?: ParentCategory;
    tax?: Tax;
  };

export type CategoryWrite = Category & {
  parent?: string;
  tax?: string;
};
