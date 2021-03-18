import { Column, ColumnInstance, Row } from 'react-table';

export type ColumnDefinition<T extends object> = Column<T> & ColumnProperties<T>;

export type ColumnInstanceDefinition<T extends object> = ColumnInstance<T> & ColumnProperties<T>;

export interface TableAction<T extends object> {
  name: string;
  callback: (row: Row<T>) => void;
}

export interface ColumnProperties<T extends object> {
  isPhoto?: boolean;
  actions?: TableAction<T>[];
}
