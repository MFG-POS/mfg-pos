import { TableInstance, useFlexLayout, useTable } from 'react-table';
import { Table } from '@chakra-ui/react';
import styled from 'styled-components';
import Header from './Header';
import Body from './Body';
import { ColumnDefinition } from '../../model/table/table-definitions';

const Styles = styled.div`
  display: block;
  overflow-x: auto;
  overflow-y: hidden;

  .thead {
    overflow-y: auto;
    overflow-x: hidden;
  }

  .tbody {
    overflow-y: scroll;
    overflow-x: hidden;
  }
`;

export interface ContentProps<T extends object> {
  data: T[];
  columns: ColumnDefinition<T>[];
}

function Content<T extends object>(props: ContentProps<T>) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow }: TableInstance<T> = useTable(
    {
      columns: props.columns,
      data: props.data,
    },
    useFlexLayout,
  );

  return (
    <Styles>
      <Table variant="simple" {...getTableProps()}>
        <Header headerGroups={headerGroups} />
        <Body bodyProps={getTableBodyProps()} prepareRow={prepareRow} rows={rows} />
      </Table>
    </Styles>
  );
}

export default Content;
