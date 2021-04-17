import { TableInstance } from 'react-table';
import { Table } from '@chakra-ui/react';
import styled from 'styled-components';
import React from 'react';
import { BaseObject } from 'model/base-object';
import Header from './Header';
import Body from './Body';

const Styles = styled.div`
  display: block;
  overflow-x: auto;
  overflow-y: hidden;
`;

function Content<T extends BaseObject>(props: TableInstance<T>) {
  return (
    <Styles>
      <Table variant="simple" {...props.getTableProps()}>
        <Header headerGroups={props.headerGroups} />
        <Body bodyProps={props.getTableBodyProps()} prepareRow={props.prepareRow} page={props.page} />
      </Table>
    </Styles>
  );
}

export default Content;
