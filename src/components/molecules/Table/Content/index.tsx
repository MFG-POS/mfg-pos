import { TableInstance } from 'react-table';
import { Box, Table } from '@chakra-ui/react';
import Header from 'components/molecules/Table/Header';
import Body from 'components/molecules/Table/Body';
import { MenuDocument } from 'model/menu/menu';

function Content<T extends MenuDocument>({
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
