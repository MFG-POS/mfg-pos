import { TablesType } from 'model/tableDND/row-type';
import { save } from 'api/firebase/firestore/firestore-actions';

const SaveBoard = (tables: TablesType) => {
  console.log(tables);
  save('board', tables);
};

export default SaveBoard;
