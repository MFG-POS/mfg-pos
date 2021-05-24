import { Box } from '@chakra-ui/react';
import { useDrop } from 'react-dnd';
import ItemTypes from './ItemTypes';
import Table from './Table';
import MoveTable from './Move';

type TablePositionType = {
  tablePosition: Object[];
};

let numberKey: number = 0;
let typeSquare: string = 'null';
const squares: Object[] = [];
let tableId: number = 0;

const RenderSquare = (squarePositionX: number, squarePositionY: number, kindOf: string) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.TABLE,
    drop: () => {
      MoveTable(squarePositionX, squarePositionY, tableId);
      tableId -= 1;
    },
  }));
  return (
    <Box
      ref={drop}
      key={numberKey}
      x={squarePositionX}
      y={squarePositionY}
      width="10%"
      height="10%"
      float="left"
      minHeight="40px"
    >
      {renderTable(kindOf)}
    </Box>
  );
};

const renderTable = (kindOf: string) => {
  if (kindOf == 'table') {
    return <Table id={tableId} />;
  }
  return null;
};

const Items = ({ tablePosition }: TablePositionType) => {
  console.log(tablePosition);
  numberKey = 0;
  for (let i: number = 0; i < 10; i++) {
    squares[i] = new Array(10);
  }
  for (let i: number = 0; i < 10; i++) {
    for (let j: number = 0; j < 10; j++) {
      for (let z: number = 0; z < tablePosition.length; z++) {
        // @ts-ignore: Object is possibly 'null'.
        if (i == tablePosition[z].positionX && j == tablePosition[z].positionY) {
          // @ts-ignore: Object is possibly 'null'.
          squares[i][j] = RenderSquare(i, j, 'table');
        } else {
          // @ts-ignore: Object is possibly 'null'.
          squares[i][j] = RenderSquare(i, j, 'null');
        }
      }
      numberKey += 1;
    }
  }
  tableId += 1;
  console.log(squares);
  return (
    <Box id="square" w="100%" h="400px">
      {squares}
    </Box>
  );
};

let idDropTables: number;

export const idElement = (tableSquares: number) => {
  idDropTables = tableSquares;
};

export default Items;
