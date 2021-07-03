export type Board = {
  id: string;
  tables: TablesHolder;
};

export type TablesHolder = {
  [key: string]: TableInstance;
};

export type TableInstance = {
  top: number;
  left: number;
  text: string;
  width: number;
  height: number;
  borderRadius: number;
};
