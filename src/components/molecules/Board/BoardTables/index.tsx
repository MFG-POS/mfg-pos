import React from 'react';
import { BoardTableInstance, TableDND } from 'model/board/board-table-instance';
import { Box } from '@chakra-ui/react';
import { useDrop, XYCoord } from 'react-dnd';
import BoardTable from 'components/molecules/Board/BoardTable';
import { isNullOrUndefined } from 'others/helper-functions';

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
        const board: HTMLElement | null = document.getElementById('board');
        const table: HTMLElement | null = document.getElementById(item.id);

        if (!isNullOrUndefined(board) && !isNullOrUndefined(table)) {
          const tableStyles: CSSStyleDeclaration = getComputedStyle(table as Element);

          const getNumericStyleValue = (value: string): number =>
            Number(tableStyles.getPropertyValue(value).replace('px', ''));

          const delta: XYCoord = monitor.getDifferenceFromInitialOffset() as XYCoord;
          const tableWidth: number = getNumericStyleValue('width');
          const tableHeight: number = getNumericStyleValue('height');

          let left = item.left + delta.x;
          let top = item.top + delta.y;

          // If the table extends beyond top or left edge
          if (top <= 0) top = 0;
          if (left <= 0) left = 0;

          // If the table extends beyond the bottom or right edge
          if (top > 0 && top + tableHeight > board!.clientHeight) top = board!.clientHeight - tableHeight;
          if (left > 0 && left + tableWidth > board!.clientWidth) left = board!.clientWidth - tableWidth;

          moveTable(item.id, left, top);
        }
      },
    }),
    [moveTable],
  );

  return (
    <Box id="board" ref={drop} w="100%" h="100%" position="relative">
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
