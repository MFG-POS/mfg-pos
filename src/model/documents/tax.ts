import { BaseModel } from '../base-model';

export interface Tax extends BaseModel {
  name: string;
  value: number;
  isFiscal: boolean;
  fiscalRecorderProgram: string;
}
