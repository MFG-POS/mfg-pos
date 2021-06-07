import { useCallback, useState, SetStateAction } from 'react';
import { Box, Textarea, Text } from '@chakra-ui/react';
import update from 'immutability-helper';
import { useDrop, XYCoord, useDrag } from 'react-dnd';
import TableDND from 'model/tableDND/tablednd-type';
import { TablesType, RowType } from 'model/tableDND/row-type';
import { TypeItem } from 'model/tableDND/item-type';
import { TableType } from 'model/tableDND/table-types';
import SaveBoard from 'components/molecules/PlanRoom/SaveRoomTables/SaveBoard';
import { theme } from 'others/theme';

let ChangeValueTable: Function;
let ChangeValueTableBorderRadius: Function;
let AddNewTable: Function;
let Save: Function;

const TableList = () => {
  const [tables, setTables] = useState<TablesType>({
    0: { top: 0, left: 0, text: '0', width: 100, height: 50, borderRadius: 0 },
  });

  const MoveTable = useCallback(
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

  ChangeValueTable = useCallback(
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

  ChangeValueTableBorderRadius = useCallback(
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

  AddNewTable = (id: number) => {
    tables[id] = { top: 0, left: 0, text: id.toString(), width: 100, height: 50, borderRadius: 0 };
    let top = Math.floor(Math.random() * 100) + 40;
    if (top > 80) {
      top = 80;
    }
    MoveTable(id.toString(), Math.floor(Math.random() * 800) + 50, top);
  };

  const [, drop] = useDrop(
    () => ({
      accept: TableDND.TABLE,
      drop(item: TypeItem & RowType, monitor) {
        const delta = monitor.getDifferenceFromInitialOffset() as XYCoord;
        let left = item.left + delta.x;
        let top = item.top + delta.y;
        if (top > 319) {
          const difference: number = top - 319;
          top -= difference;
        }
        if (top < 0) {
          top = 0;
        }
        if (left < 0) {
          left = 0;
        }
        MoveTable(item.id, left, top);
      },
    }),
    [MoveTable],
  );

  Save = () => {
    console.log(tables);
    return tables;
  };

  return (
    <Box ref={drop} w="100%" h="100%" position="relative">
      {Object.keys(tables).map((id) => {
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

const Table = ({ id, left, top, height, width, borderRadius, text }: TableType & RowType) => {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: TableDND.TABLE,
      item: { id, left, top },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [id, left, top],
  );

  if (isDragging) {
    return <Text ref={drag} />;
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
      backgroundColor={theme.colors.table[100]}
      color="white"
      maxLength={2}
      focusBorderColor="none"
      paddingTop="25px"
      maxH="80px"
      defaultValue={text}
      onDoubleClick={() => {
        ChangeValueTableBorderRadius(id.toString(), ShouldProvideRadius(borderRadius));
      }}
      onChange={(event) => {
        ChangeValueTable(id.toString(), event.target.value.toString());
      }}
    />
  );
};

const ShouldProvideRadius = (hasRadius: number) => (hasRadius == 0 ? 40 : 0);

let numberTable: number = 1;

export const NewTable = () => {
  AddNewTable(numberTable);
  numberTable += 1;
};

export const SaveTables = () => {
  SaveBoard(Save());
};

export default TableList;
