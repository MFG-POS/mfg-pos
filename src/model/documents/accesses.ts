import { BaseModel } from 'model/base-model';
import { Tax } from './tax';

export type Employee = BaseModel & {
  name: string;
  surname: string;
  pin: boolean;
  tax: Tax;
};
