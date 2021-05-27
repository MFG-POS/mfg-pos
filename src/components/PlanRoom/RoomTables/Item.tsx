import { useCallback, useState } from 'react';
import { Box } from '@chakra-ui/react';
import update from 'immutability-helper';
import { useDrop, XYCoord } from 'react-dnd';
import ItemTypes from './ItemTypes';
import Table from './Table';
import { TypeItem } from './Types';

export interface ContainerState {
  tables: {
    [key: string]: { top: number; left: number; title: string; width: number; height: number; borderRadius: number };
  };
}

const Items = () => {
  const [tables, setTables] = useState<{
    [key: string]: { top: number; left: number; text: string; width: number; height: number; borderRadius: number };
  }>({
    1: { top: 0, left: 0, text: '1', width: 100, height: 50, borderRadius: 0 },
    2: { top: 0, left: 0, text: '2', width: 100, height: 50, borderRadius: 0 },
    3: { top: 0, left: 0, text: '3', width: 100, height: 50, borderRadius: 0 },
  });

  const moveTable = useCallback(
    (id: string, left: number, top: number) => {
      setTables(
        update(tables, {
          [id]: {
            $merge: { left, top },
          },
        }),
      );
    },
    [tables, setTables],
  );

  const [, drop] = useDrop(
    () => ({
      accept: ItemTypes.TABLE,
      drop(item: TypeItem, monitor) {
        const delta = monitor.getDifferenceFromInitialOffset() as XYCoord;
        let left = item.left + delta.x;
        let top = item.top + delta.y;
        if (top > 350) {
          const difference: number = top - 350;
          top -= difference;
        }
        if (top < 0) {
          top = 0;
        }
        if (left < 0) {
          left = 0;
        }
        moveTable(item.id, left, top);
        return undefined;
      },
    }),
    [moveTable],
  );

  return (
    <Box ref={drop} w="100%" h="100%" position="relative">
      {Object.keys(tables).map((id) => {
        const { left, top, text, height, width, borderRadius } = tables[id];
        return (
          <Table key={id} id={id} left={left} top={top} height={height} width={width} borderRadius={borderRadius}>
            {text}
          </Table>
        );
      })}
    </Box>
  );
};

export default Items;
