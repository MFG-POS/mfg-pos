import { BaseModel } from 'model/base-model';

export type Access = BaseModel & {
  name: string;
  sureName: string;
  PIN: boolean;
};
