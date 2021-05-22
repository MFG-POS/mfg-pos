import { TableInstance } from 'react-table';
import { Box, Table } from '@chakra-ui/react';
import React from 'react';
import { BaseObject } from 'model/base-object';
import Header from 'components/molecules/Table/Header';
import Body from 'components/molecules/Table/Body';

function Content<T extends BaseObject>({
  headerGroups,
  getTableProps,
  getTableBodyProps,
  prepareRow,
  page,
}: TableInstance<T>) {
  return (
    <Box overflowX="auto" overflowY="hidden">
      <Table variant="simple" {...getTableProps()}>
        <Header headerGroups={headerGroups} />
        <Body bodyProps={getTableBodyProps()} prepareRow={prepareRow} page={page} />
      </Table>
    </Box>
  );
}

export default Content;
