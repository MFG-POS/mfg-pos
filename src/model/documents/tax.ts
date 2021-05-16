import { BaseModel } from 'model/base-model';

export interface Tax extends BaseModel {
  name: string;
  value: number;
  isFiscal: boolean;
  fiscalRecorderProgram: string;
}
