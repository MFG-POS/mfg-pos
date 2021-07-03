import { useCallback, useState } from 'react';
import { Box, Textarea, Text, Image } from '@chakra-ui/react';
import update from 'immutability-helper';
import { useDrop, XYCoord, useDrag } from 'react-dnd';
import TableDND from 'model/tableDND/tablednd-type';
import { TablesType, RowType } from 'model/tableDND/row-type';
import { TypeItem } from 'model/tableDND/item-type';
import { TableType } from 'model/tableDND/table-types';
import SaveBoard from 'components/molecules/PlanRoom/SaveRoomTables/SaveBoard';
import { theme } from 'others/theme';
import { DeleteIcon } from '@chakra-ui/icons';

let ChangeValueTable: Function;
let ChangeValueTableBorderRadius: Function;
let AddNewTable: Function;
let Save: Function;
let ClearBoard: Function;
let DeleteTable: Function;

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

  const ChangeItem = useCallback(
    (id: string, left: number, top: number, text: string, borderRadius: number) => {
      setTables(
        update(tables, {
          [id]: {
            $merge: { left, top, text, borderRadius },
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

  ClearBoard = () => {
    while (tableNumber > -1) {
      delete tables[tableNumber];
      tableNumber -= 1;
    }
    tableNumber = 1;
    tables[0] = { top: 20, left: 0, text: '0', width: 100, height: 50, borderRadius: 0 };
    MoveTable('0', 0, 0);
  };

  DeleteTable = (id: number) => {
    if (tableNumber > 1) {
      for (let scope: number = id; scope < tableNumber - 2; scope++) {
        tables[Number(scope)] = {
          top: tables[Number(scope) + 1].top,
          left: tables[Number(scope) + 1].left,
          text: tables[Number(scope)].text,
          width: 100,
          height: 50,
          borderRadius: tables[Number(scope)].borderRadius,
        };
      }
      const tempTable: RowType = {
        top: tables[tableNumber - 1].top,
        left: tables[tableNumber - 1].left,
        text: tables[tableNumber - 1].text,
        width: 100,
        height: 50,
        borderRadius: tables[tableNumber - 1].borderRadius,
      };
      delete tables[tableNumber - 1];
      MoveTable((tableNumber - 2).toString(), tempTable.left, tempTable.top);
      tableNumber -= 1;
    }
  };

  AddNewTable = (id: number) => {
    tables[id] = { top: 0, left: 0, text: id.toString(), width: 100, height: 50, borderRadius: 0 };
    let top = Math.floor(Math.random() * 100) + 30;
    if (top > 80) {
      top = 80;
    }
    MoveTable(id.toString(), Math.floor(Math.random() * 800) + 50, top);
  };

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
    <Box
      ref={drag}
      zIndex={id + 1}
      color="white"
      position="absolute"
      cursor="pointer"
      h="0"
      width={width}
      height={height}
      left={left}
      top={top}
    >
      <DeleteIcon
        alt=""
        id={id}
        position="absolute"
        zIndex={id + 2}
        m="0.1em"
        w="20px"
        h="20px"
        onClick={() => {
          DeleteTable(id);
        }}
      />
      <Textarea
        zIndex={id + 1}
        borderRadius={borderRadius}
        textAlign="center"
        backgroundColor={theme.colors.table[100]}
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
    </Box>
  );
};

const ShouldProvideRadius = (hasRadius: number) => (hasRadius == 0 ? 40 : 0);

let tableNumber: number = 1;

export const NewTable = () => {
  AddNewTable(tableNumber);
  tableNumber += 1;
};

export const SaveTables = () => {
  SaveBoard(Save());
};

export const DeleteTables = () => {
  ClearBoard();
};

export default TableList;
