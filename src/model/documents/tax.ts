import { BaseModel } from 'model/base-model';

export enum TaxType {
  OnTurnOver = 'Wartość dodana (VAT)',
  ValueAdded = 'Z obrotu',
}

export type Tax = BaseModel & {
  name: string;
  value: number;
  isFiscal: boolean;
  type: TaxType;
};
