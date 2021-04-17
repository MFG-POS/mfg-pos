import { Tbody, Td, Tr } from '@chakra-ui/react';
import { Cell, Row, TableBodyProps } from 'react-table';
import { ColumnInstanceDefinition } from 'model/table/table-definitions';
import { BaseObject } from 'model/base-object';
import ActionCell from './ActionCell';
import ImageCell from './ImageCell';

type BodyProps<T extends BaseObject> = {
  bodyProps: TableBodyProps;
  page: Array<Row<T>>;
  prepareRow: (row: Row<T>) => void;
};

function Body<T extends BaseObject>(props: BodyProps<T>) {
  return (
    <Tbody {...props.bodyProps}>
      {props.page.map((row) => {
        props.prepareRow(row);
        return (
          <Tr borderBottom="1px" borderColor="gray.200" {...row.getRowProps()} key={row.id}>
            {row.cells.map((cell: Cell<T>) => {
              // eslint-disable-next-line
              const column: ColumnInstanceDefinition<T> = cell.column;
              return (
                <Td alignSelf="center" border="none" {...cell.getCellProps()} key={cell.column.id}>
                  {column.isImageColumn ? (
                    <ImageCell src={cell.value} width="100px" />
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
