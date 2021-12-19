import { Image, Tbody, Td, Tr } from '@chakra-ui/react';
import { Cell, Row, TableBodyProps } from 'react-table';
import { ColumnInstanceDefinition } from 'model/table/table-definitions';
import ActionCell from 'components/molecules/Table/ActionCell';
import { CommonDocument } from 'model/documents/common';
import loading from 'assets/images/loading.gif';
import { v4 as uuidv4 } from 'uuid';

type BodyProps<T extends CommonDocument> = {
  bodyProps: TableBodyProps;
  page: Array<Row<T>>;
  prepareRow: (row: Row<T>) => void;
};

function Body<T extends CommonDocument>({ bodyProps, page, prepareRow }: BodyProps<T>) {
  return (
    <Tbody {...bodyProps}>
      {page.map((row) => {
        prepareRow(row);
        return (
          <Tr borderBottom="1px" borderColor="gray.200" {...row.getRowProps()} key={row.id}>
            {row.cells.map((cell: Cell<T>) => {
              // eslint-disable-next-line
              const column: ColumnInstanceDefinition<T> = cell.column;
              return (
                <Td alignSelf="center" border="none" {...cell.getCellProps()} key={cell.column.id}>
                  {column.isImageColumn ? (
                    <Image src={cell.value} alt="" width="100px" fallbackSrc={loading} key={uuidv4()} />
                  ) : column.actions ? (
                    <ActionCell name="Akcje" actions={column.actions} row={row} key={uuidv4()} />
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
