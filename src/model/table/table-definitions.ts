import { Column, ColumnInstance, Row } from 'react-table';
import { MenuDocument } from 'model/menu/menu';

export type ColumnDefinition<T extends MenuDocument> = Column<T> & ColumnProperties<T>;

export type ColumnInstanceDefinition<T extends MenuDocument> = ColumnInstance<T> & ColumnProperties<T>;

export interface TableAction<T extends MenuDocument> {
  name: string;
  callback: (row: Row<T>) => void;
}

export interface ColumnProperties<T extends MenuDocument> {
  isImageColumn?: boolean;
  actions?: TableAction<T>[];
  canFilter?: boolean;
}

export interface TableDocument<T extends MenuDocument> {
  actions?: TableAction<T>[];
}
