import { ReactNode } from 'react';

export type TypeItem = {
  type: string;
  id: string;
  top: number;
  left: number;
  width: number;
  height: number;
  borderRadius: number;
};

export type TableType = {
  id: string;
  left: number;
  top: number;
  children: ReactNode;
  width: number;
  height: number;
  borderRadius: number;
};
