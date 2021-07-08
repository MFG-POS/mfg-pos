import { useMemo, useState } from 'react';
import { Row } from 'react-table';
import { ColumnDefinition, TableAction } from 'model/table/table-definitions';
import AdvancedTable, { AdvancedTableProps } from 'components/organisms/AdvancedTable';
import { ROUTE_MENU_FORMS } from 'routing';
import { TableCategory } from 'model/table/table-types';
import { deleteDoc } from 'api/firebase/firestore/firestore-actions';

const Categories = () => {
  // TODO: Dummy state for view refresh after item gets deleted. To be refactored with Redux.
  const [state, stateRefresher] = useState(false);

  const onRowDelete = (row: Row<TableCategory>): void => {
    // TODO: Use Chakra UI Alert Dialog in the future
    // eslint-disable-next-line no-alert
    if (window.confirm('Czy na pewno chcesz usunąć tą kategorię?')) {
      deleteDoc('categories', row.original.id);
      stateRefresher(!state);
    }
  };
  const onRowEdit = (row: Row<TableCategory>): void => console.log(`Should edit row with id ${row.id}`);

  const actions: TableAction<TableCategory>[] = useMemo(
    () => [
      { name: 'Edytuj', callback: onRowEdit },
      { name: 'Usuń', callback: onRowDelete },
    ],
    [],
  );

  const columns: ColumnDefinition<TableCategory>[] = useMemo(
    () => [
      {
        Header: 'Zdjęcie',
        accessor: 'image',
        minWidth: 300,
        isImageColumn: true,
      },
      {
        Header: 'Nazwa',
        accessor: 'name',
        minWidth: 300,
        canFilter: true,
      },
      {
        Header: 'Akcje',
        accessor: 'actions',
        actions,
      },
    ],
    [actions],
  );

  const tableProps: AdvancedTableProps<TableCategory> = {
    name: 'Kategorie',
    collection: 'categories',
    columns,
    buttonRoutePath: ROUTE_MENU_FORMS.CATEGORY.path,
    fetchRefresher: state,
  };

  return <AdvancedTable<TableCategory> {...tableProps} />;
};

export default Categories;
