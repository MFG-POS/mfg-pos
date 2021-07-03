import React from 'react';
import { TableInstance, TablesHolder } from 'model/tableDND/table-instance';
import { Box } from '@chakra-ui/react';
import { useDrop, XYCoord } from 'react-dnd';
import BoardTable from 'components/molecules/Board/BoardTable';
import TableDND from 'model/tableDND/tablednd-type';
import { TypeItem } from 'model/tableDND/item-type';

type BoardTablesProps = {
  tables: TablesHolder;
  moveTable: (id: string, left: number, top: number) => void;
  deleteTable: (id: string) => void;
  updateSeats: (id: string, value: string) => void;
  preview: boolean;
};

const BoardTables = ({ tables, moveTable, deleteTable, updateSeats, preview }: BoardTablesProps) => {
  const [, drop] = useDrop(
    () => ({
      accept: TableDND.TABLE,
      drop(item: TypeItem & TableInstance, monitor) {
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
    <Box ref={preview ? null : drop} w="100%" h="100%" position="relative">
      {tables &&
        Object.keys(tables).map((id) => {
          const { left, top, text, height, width, borderRadius } = tables[id];
          return (
            <BoardTable
              key={id}
              id={id}
              left={left}
              top={top}
              height={height}
              width={width}
              borderRadius={borderRadius}
              text={text}
              deleteTable={deleteTable}
              updateSeats={updateSeats}
              preview={preview}
            >
              {text}
            </BoardTable>
          );
        })}
    </Box>
  );
};

export default BoardTables;
