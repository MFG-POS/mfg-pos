import { Tbody, Td, Tr } from '@chakra-ui/react';
import { Cell, Row, TableBodyProps } from 'react-table';
import { ColumnInstanceDefinition } from 'model/table';
import ActionCell from './ActionCell';
import PictureCell from './PictureCell';

type BodyProps<T extends object> = {
  bodyProps: TableBodyProps;
  rows: Array<Row<T>>;
  prepareRow: (row: Row<T>) => void;
};

function Body<T extends object>(props: BodyProps<T>) {
  return (
    <Tbody {...props.bodyProps}>
      {props.rows.map((row) => {
        props.prepareRow(row);
        return (
          <Tr borderBottom="1px" borderColor="gray.200" {...row.getRowProps()} key={row.id}>
            {row.cells.map((cell: Cell<T>) => {
              // eslint-disable-next-line
              const column: ColumnInstanceDefinition<T> = cell.column;
              return (
                <Td alignSelf="center" border="none" {...cell.getCellProps()} key={cell.column.id}>
                  {column.isPhoto ? (
                    <PictureCell src={cell.value} width="100px" />
                  ) : column.actions ? (
                    <ActionCell name="Akcje" actions={column.actions} row={row} />
                  ) : (
                    cell.render('Cell')
                  )}
                </Td>
              );
            })}
          </Tr>
        );
      })}
    </Tbody>
  );
}

export default Body;
