import { useMemo, useState } from 'react';
import { Row } from 'react-table';
import { TableDish } from 'model/table/table-types';
import { ColumnDefinition, TableAction } from 'model/table/table-definitions';
import AdvancedTable, { AdvancedTableProps } from 'components/organisms/AdvancedTable';
import { ROUTE_MENU_FORMS } from 'routing';
import { taxesAndCategories } from 'others/references';
import { currency, percent } from 'others/table-formats';
import { deleteDoc } from 'api/firebase/firestore/firestore-actions';
import { deleteDishContent, deleteDishHeader, deleteDishToast } from 'others/modal-messages';

const Dishes = () => {
  // TODO: Dummy state for view refresh after item gets deleted. To be refactored with Redux.
  const [state, stateRefresher] = useState(false);

  const onRowDelete = (row: Row<TableDish>): void => {
    deleteDoc('dishes', row.original.id).then(() => stateRefresher(!state));
  };

  const onRowEdit = (row: Row<TableDish>): void => console.log(`Should edit row with id ${row.id}`);

  const actions: TableAction<TableDish>[] = useMemo(
    () => [
      { name: 'Edytuj', callback: onRowEdit },
      {
        name: 'Usuń',
        callback: onRowDelete,
        modalHeader: deleteDishHeader,
        modalContent: deleteDishContent,
        modalToast: deleteDishToast,
      },
    ],
    [],
  );

  const columns: ColumnDefinition<TableDish>[] = useMemo(
    () => [
      {
        Header: 'Zdjęcie',
        accessor: 'image',
        minWidth: 200,
        isImageColumn: true,
      },
      {
        Header: 'Nazwa',
        accessor: 'name',
        minWidth: 200,
        canFilter: true,
      },
      {
        Header: 'Kategoria',
        accessor: 'category.name',
        minWidth: 200,
        canFilter: true,
      },
      {
        Header: 'Podatek',
        accessor: 'tax.value',
        minWidth: 200,
        canFilter: true,
        Cell: percent,
      },
      {
        Header: 'Koszt netto',
        accessor: 'netPrice',
        minWidth: 200,
        canFilter: true,
        Cell: currency,
      },
      {
        Header: 'Narzut',
        accessor: 'overhead',
        minWidth: 200,
        canFilter: true,
        Cell: percent,
      },
      {
        Header: 'Koszt brutto',
        accessor: 'grossPrice',
        minWidth: 200,
        canFilter: true,
        Cell: currency,
      },
      {
        Header: 'Akcje',
        accessor: 'actions',
        actions,
      },
    ],
    [actions],
  );

  const tableProps: AdvancedTableProps<TableDish> = {
    name: 'Dania',
    collection: 'dishes',
    columns,
    references: taxesAndCategories,
    buttonRoutePath: ROUTE_MENU_FORMS.DISH.path,
    fetchRefresher: state,
  };

  return <AdvancedTable<TableDish> {...tableProps} />;
};

export default Dishes;
