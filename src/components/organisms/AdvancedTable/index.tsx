import { createContext, useEffect, useState } from 'react';
import { getAll } from 'api/firebase/firestore/firestore-actions';
import { isEmpty } from 'others/helper-functions';
import { TableInstance, useFlexLayout, usePagination, useTable } from 'react-table';
import { ColumnDefinition } from 'model/table/table-definitions';
import { FilterColumn, FilterFunctions, FilterRuleDefinition } from 'model/table/table-filter-types';
import TopBar from 'components/molecules/Table/TopBar';
import Content from 'components/molecules/Table/Content';
import { Box } from '@chakra-ui/react';
import Paginator from 'components/molecules/Table/Paginator';
import Toolbar, { ToolbarProps } from 'components/molecules/Table/Toolbar';
import { MenuDocument } from 'model/menu/menu';
import { DocumentReferenceHolder } from 'api/firebase/firebase.types';

export const Route = createContext({ path: '' });

export interface AdvancedTableProps<T extends MenuDocument> extends Omit<ToolbarProps, 'filterColumns'> {
  name: string;
  collection: string;
  columns: ColumnDefinition<T>[];
  references?: DocumentReferenceHolder[];
  // TODO: To be refactored with global state
  fetchRefresher?: boolean;
}

function AdvancedTable<T extends MenuDocument>(props: AdvancedTableProps<T>) {
  const [data, setData] = useState<T[]>([]);
  const [displayedData, setDisplayedData] = useState<T[]>([]);

  const filterColumns: FilterColumn[] = props.columns
    .filter((column) => column.canFilter)
    .map((column) => ({ name: column.Header as string, accessor: column.accessor as string }));
  const filterColumnsAccessors: string[] = filterColumns.map((column) => column.accessor);

  useEffect(() => {
    const docs = getAll<T>(props.collection, props.references);
    docs
      .then((documents) => {
        setData(documents);
        setDisplayedData(documents);
      })
      .catch((error) => {
        throw new Error(`Could not fetch ${props.collection} collection!. Error: ${error.message}`);
      });
  }, [props.collection, props.references, props.fetchRefresher]);

  const onSearch = (value: string): void => {
    if (isEmpty(value) || isEmpty(filterColumns)) setDisplayedData(data);
    else setDisplayedData(FilterFunctions.text(data, filterColumnsAccessors, value));
  };

  const onFilter = (filterRules: FilterRuleDefinition[]): void =>
    setDisplayedData(FilterFunctions.filterRows(data, filterColumnsAccessors, filterRules));

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
    <Route.Provider value={{ path: props.buttonRoutePath! }}>
      <Box m="2rem" minW="90%">
        <TopBar name={props.name} length={data.length} />
        <Toolbar
          filterColumns={filterColumns}
          buttonRoutePath={props.buttonRoutePath}
          onSearch={onSearch}
          onFilter={onFilter}
        />
        <Content {...tableInstance} />
        <Paginator {...tableInstance} />
      </Box>
    </Route.Provider>
  );
}

export default AdvancedTable;
