import { FieldValue } from 'api/firebase/firebase.types';

export type BoardTableInstance = {
  id: string;
  top: number;
  left: number;
  seats: number;
  width: number;
  height: number;
  borderRadius: number;
  orderId?: string | FieldValue;
  orderGuests?: number | FieldValue;
};

export const TableDND = {
  TABLE: 'table',
};
