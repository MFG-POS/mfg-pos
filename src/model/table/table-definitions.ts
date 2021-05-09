import { Column, ColumnInstance, Row } from 'react-table';
import { BaseObject } from 'model/base-object';

export type ColumnDefinition<T extends BaseObject> = Column<T> & ColumnProperties<T>;

export type ColumnInstanceDefinition<T extends BaseObject> = ColumnInstance<T> & ColumnProperties<T>;

export interface TableAction<T extends BaseObject> {
  name: string;
  callback: (row: Row<T>) => void;
}

export interface ColumnProperties<T extends BaseObject> {
  isImageColumn?: boolean;
  actions?: TableAction<T>[];
}

export interface TableDocument<T extends BaseObject> {
  actions?: TableAction<T>[];
}
