import { BaseModel } from 'model/base-model';

export type Employee = BaseModel & {
  name: string;
  surname: string;
  pin: boolean;
};
