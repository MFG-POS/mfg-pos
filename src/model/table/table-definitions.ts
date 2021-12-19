import { Column, ColumnInstance, Row } from 'react-table';
import { CommonDocument } from 'model/documents/common';

export type ColumnDefinition<T extends CommonDocument> = Column<T> & ColumnProperties<T>;

export type ColumnInstanceDefinition<T extends CommonDocument> = ColumnInstance<T> & ColumnProperties<T>;

export interface TableAction<T extends CommonDocument> {
  name: string;
  modalHeader?: string;
  modalContent?: string;
  modalToast?: string;
  callback: (row: Row<T>) => void;
}

export interface ColumnProperties<T extends CommonDocument> {
  isImageColumn?: boolean;
  actions?: TableAction<T>[];
  canFilter?: boolean;
}

export interface TableDocument<T extends CommonDocument> {
  actions?: TableAction<T>[];
}
