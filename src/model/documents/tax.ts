import { BaseModel } from 'model/base-model';

export type Tax = BaseModel & {
  name: string;
  value: number;
  isFiscal: boolean;
  taxType: string;
};
