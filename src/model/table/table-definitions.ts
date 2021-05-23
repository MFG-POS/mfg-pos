import { Column, ColumnInstance, Row } from 'react-table';
import { BaseObject } from 'model/base-object';
import { BaseModel } from 'model/base-model';

export type ColumnDefinition<T extends BaseObject> = Column<T> & ColumnProperties<T>;

export type ColumnInstanceDefinition<T extends BaseObject> = ColumnInstance<T> & ColumnProperties<T>;

export interface TableAction<T extends BaseModel> {
  name: string;
  callback: (row: Row<T>) => void;
}

export interface ColumnProperties<T extends BaseObject> {
  isImageColumn?: boolean;
  actions?: TableAction<T>[];
  canFilter?: boolean;
}

export interface TableDocument<T extends BaseModel> {
  actions?: TableAction<T>[];
}
