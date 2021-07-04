import React from 'react';
import { BoardTableInstance, TableDND } from 'model/board/board-table-instance';
import { Box } from '@chakra-ui/react';
import { useDrop, XYCoord } from 'react-dnd';
import BoardTable from 'components/molecules/Board/BoardTable';

type BoardTablesProps = {
  tables: BoardTableInstance[];
  moveTable: (id: string, left: number, top: number) => void;
  deleteTable: (id: string) => void;
  updateSeats: (id: string, value: string) => void;
};

const BoardTables = ({ tables, moveTable, deleteTable, updateSeats }: BoardTablesProps) => {
  const [, drop] = useDrop(
    () => ({
      accept: TableDND.TABLE,
      drop(item: BoardTableInstance, monitor) {
        const delta = monitor.getDifferenceFromInitialOffset() as XYCoord;
        let left = item.left + delta.x;
        let top = item.top + delta.y;
        if (top > 455) {
          const difference: number = top - 340;
          top -= difference;
        }
        if (top < 0) {
          top = 0;
        }
        if (left < 0) {
          left = 0;
        }
        moveTable(item.id, left, top);
      },
    }),
    [moveTable],
  );

  return (
    <Box ref={drop} w="100%" h="100%" position="relative">
      {tables &&
        tables.map((table) => {
          const { id, left, top, seats, height, width, borderRadius } = table;
          return (
            <BoardTable
              key={id}
              id={id}
              left={left}
              top={top}
              height={height}
              width={width}
              borderRadius={borderRadius}
              seats={seats}
              deleteTable={deleteTable}
              updateSeats={updateSeats}
            />
          );
        })}
    </Box>
  );
};

export default BoardTables;
