export type TablesType = {
  [key: string]: RowType;
};

export type RowType = {
  top: number;
  left: number;
  text: string;
  width: number;
  height: number;
  borderRadius: number;
};
