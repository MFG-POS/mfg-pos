import { useMemo, useState } from 'react';
import { Row } from 'react-table';
import { ColumnDefinition, TableAction } from 'model/table/table-definitions';
import AdvancedTable, { AdvancedTableProps } from 'components/organisms/AdvancedTable';
import { ROUTE_MENU_FORMS } from 'routing';
import { TableCategory } from 'model/table/table-types';
import { deleteDoc } from 'api/firebase/firestore/firestore-actions';
import { deleteCategoryContent, deleteCategoryHeader, deleteCategoryToast } from 'others/modal-messages';
import { categoryKind } from 'others/table-formats';

const Categories = () => {
  // TODO: Dummy state for view refresh after item gets deleted. To be refactored with Redux.
  const [state, stateRefresher] = useState(false);

  const onRowDelete = (row: Row<TableCategory>): void => {
    deleteDoc('categories', row.original.id).then(() => stateRefresher(!state));
  };

  const onRowEdit = (row: Row<TableCategory>): void => console.log(`Should edit row with id ${row.id}`);

  const actions: TableAction<TableCategory>[] = useMemo(
    () => [
      { name: 'Edytuj', callback: onRowEdit },
      {
        name: 'Usuń',
        callback: onRowDelete,
        modalHeader: deleteCategoryHeader,
        modalContent: deleteCategoryContent,
        modalToast: deleteCategoryToast,
      },
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
        Header: 'Rodzaj',
        accessor: 'kind',
        minWidth: 300,
        canFilter: true,
        Cell: categoryKind,
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
