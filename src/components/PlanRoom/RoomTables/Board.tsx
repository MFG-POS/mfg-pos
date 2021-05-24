import { render, unmountComponentAtNode } from 'react-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Items from './Item';

const tables: Object[] = [];

const AddTable = (positionX: number, positionY: number, id: number) => {
  if (id == -1) {
    tables.push({ positionX, positionY });
    creatTable(tables);
  } else {
    let idTable: number = id;
    idTable -= 1;
    tables[idTable] = { positionX, positionY };
    creatTable(tables);
  }
};

const creatTable = (position: Object[]) => {
  render(
    <DndProvider backend={HTML5Backend}>
      <Items tablePosition={position} />
    </DndProvider>,
    document.getElementById('board'),
  );
};

export default AddTable;
