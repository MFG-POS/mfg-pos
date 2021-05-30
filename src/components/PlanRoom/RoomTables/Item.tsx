import { useCallback, useState, SetStateAction } from 'react';
import { Box, Textarea } from '@chakra-ui/react';
import update from 'immutability-helper';
import { useDrop, XYCoord, useDrag } from 'react-dnd';
import ItemTypes from './ItemTypes';
import { TypeItem, TableType } from './Types';

let changeValueTable: Function;
let changeValueTableBorderRadius: Function;
let newTable: Function;

const Items = () => {
  const [tables, setTables] = useState<{
    [key: string]: { top: number; left: number; text: string; width: number; height: number; borderRadius: number };
  }>({
    0: { top: 0, left: 0, text: '0', width: 100, height: 50, borderRadius: 0 },
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

  changeValueTable = useCallback(
    (id: string, text: string) => {
      setTables(
        update(tables, {
          [id]: {
            $merge: { text },
          },
        }),
      );
    },
    [tables, setTables],
  );

  changeValueTableBorderRadius = useCallback(
    (id: string, borderRadius: number) => {
      setTables(
        update(tables, {
          [id]: {
            $merge: { borderRadius },
          },
        }),
      );
    },
    [tables, setTables],
  );

  newTable = (id: number) => {
    tables[id] = { top: 0, left: 0, text: id.toString(), width: 100, height: 50, borderRadius: 0 };
    let top = Math.floor(Math.random() * 100) + 40;
    if (top > 80) {
      top = 80;
    }
    moveTable((id - 1).toString(), Math.floor(Math.random() * 800) + 50, top);
  };

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
        console.log(tables);
        const { left, top, text, height, width, borderRadius } = tables[id];
        return (
          <Table
            key={id}
            id={id}
            left={left}
            top={top}
            height={height}
            width={width}
            borderRadius={borderRadius}
            text={text}
          >
            {text}
          </Table>
        );
      })}
    </Box>
  );
};

const Table = ({ id, left, top, height, width, borderRadius, text }: TableType) => {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.TABLE,
      item: { id, left, top },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [id, left, top],
  );

  if (isDragging) {
    return <Box ref={drag} />;
  }
  return (
    <Textarea
      id={id}
      ref={drag}
      position="absolute"
      borderRadius={borderRadius}
      cursor="pointer"
      textAlign="center"
      left={left}
      top={top}
      width={width}
      height={height}
      backgroundColor="#211F1F"
      color="white"
      maxLength={2}
      focusBorderColor="none"
      paddingTop="25px"
      defaultValue={text}
      onDoubleClick={() => {
        changeValueTableBorderRadius(id.toString(), TableRadius(borderRadius));
      }}
      onChange={(event) => {
        changeValueTable(id.toString(), event.target.value.toString());
      }}
    />
  );
};

const TableRadius = (radius: number) => {
  if (radius == 40) {
    return 0;
  }
  return 40;
};

let numberTable: number = 1;

export const NewTable = () => {
  newTable(numberTable);
  numberTable += 1;
};

export default Items;
