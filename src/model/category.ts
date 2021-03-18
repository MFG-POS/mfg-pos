import { TableAction } from './table';

export interface Category {
  id?: number;
  photo?: string;
  name?: string;
  type?: string;
  actions?: TableAction<this>[];
}
