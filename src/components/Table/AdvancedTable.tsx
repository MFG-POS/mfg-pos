import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { getAll } from 'api/firebase/firestore/firestore-actions';
import { isEmpty } from 'others/helper-functions';
import { BaseObject } from 'model/base-object';
import { TableInstance, useFlexLayout, usePagination, useTable } from 'react-table';
import { ColumnDefinition } from 'model/table/table-definitions';
import TopBar from './TopBar';
import Paginator from './Paginator';
import Content from './Content';
import Toolbar, { ToolbarProps } from './Toolbar';

const Styles = styled.div`
  margin: 2rem;
  width: 90%;
  min-height: 100vh;
`;

export interface AdvancedTableProps<T extends BaseObject> extends ToolbarProps {
  name: string;
  collection: string;
  columns: ColumnDefinition<T>[];
  filterColumns?: string[];
  showTopBar?: boolean;
  showToolbar?: boolean;
}

function AdvancedTable<T extends BaseObject>(props: AdvancedTableProps<T>) {
  const [data, setData] = useState<T[]>([]);
  const [displayedData, setDisplayedData] = useState<T[]>([]);

  useEffect(() => {
    const docs = getAll<T>(props.collection);
    docs
      .then((categories) => {
        setData(categories);
        setDisplayedData(categories);
      })
      .catch((error) => {
        throw new Error(`Could not fetch ${props.collection} collection!. Error: ${error.message}`);
      });
  }, [props.collection]);

  const onSearch = (value: string): void => {
    if (isEmpty(value) || isEmpty(props.filterColumns)) setDisplayedData(data);
    else setDisplayedData(data.filter((row) => filterRow(row, value)));
  };

  const filterRow = (row: T, value: string): boolean => {
    let show: boolean = false;
    if (props.filterColumns !== undefined) {
      for (let i = 0; i < props.filterColumns.length; i += 1) {
        const columnName: string = props.filterColumns[i];
        const columnValue: unknown = row[columnName];
        const hasProperType: boolean = typeof columnValue === 'string' || typeof columnValue === 'number';
        if (hasProperType && String(columnValue).toLowerCase().includes(value.toLowerCase())) {
          show = true;
          break;
        }
      }
    }
    return show;
  };

  const tableInstance: TableInstance<T> = useTable(
    {
      columns: props.columns,
      data: displayedData,
      initialState: { pageIndex: 0 },
    },
    useFlexLayout,
    usePagination,
  );

  return (
    <Styles>
      {props.showTopBar && <TopBar name={props.name} length={data.length} />}
      {props.showToolbar && (
        <Toolbar
          showButton={props.showButton}
          showFilter={props.showFilter}
          showSearchBar={props.showSearchBar}
          onButtonClick={props.onButtonClick}
          onFilterClick={props.onFilterClick}
          onSearch={onSearch}
        />
      )}
      <Content {...tableInstance} />
      <Paginator {...tableInstance} />
    </Styles>
  );
}

export default AdvancedTable;
