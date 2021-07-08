import { Row } from 'react-table';
import { TableIngredient } from 'model/table/table-types';
import { ColumnDefinition, TableAction } from 'model/table/table-definitions';
import { useMemo, useState } from 'react';
import AdvancedTable, { AdvancedTableProps } from 'components/organisms/AdvancedTable';
import { ROUTE_MENU_FORMS } from 'routing';
import { categories } from 'others/references';
import { unitOfMeasure } from 'others/table-formats';
import { deleteDoc } from 'api/firebase/firestore/firestore-actions';

const Ingredients = () => {
  // TODO: Dummy state for view refresh after item gets deleted. To be refactored with Redux.
  const [state, stateRefresher] = useState(false);

  const onRowDelete = (row: Row<TableIngredient>): void => {
    // TODO: Use Chakra UI Alert Dialog in the future
    // eslint-disable-next-line no-alert
    if (window.confirm('Czy na pewno chcesz usunąć tą kategorię?')) {
      deleteDoc('ingredients', row.original.id).then(() => {
        stateRefresher(!state);
      });
    }
  };
  const onRowEdit = (row: Row<TableIngredient>): void => console.log(`Should edit row with id ${row.id}`);

  const actions: TableAction<TableIngredient>[] = useMemo(
    () => [
      { name: 'Edytuj', callback: onRowEdit },
      { name: 'Usuń', callback: onRowDelete },
    ],
    [],
  );

  const columns: ColumnDefinition<TableIngredient>[] = useMemo(
    () => [
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
        Header: 'Jednostka miary',
        accessor: 'unitOfMeasure',
        minWidth: 200,
        canFilter: true,
        Cell: unitOfMeasure,
      },
      {
        Header: 'Zapasy',
        accessor: 'supplies',
        minWidth: 200,
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

  const tableProps: AdvancedTableProps<TableIngredient> = {
    name: 'Składniki',
    collection: 'ingredients',
    columns,
    references: [categories],
    buttonRoutePath: ROUTE_MENU_FORMS.INGREDIENT.path,
    fetchRefresher: state,
  };

  return <AdvancedTable<TableIngredient> {...tableProps} />;
};

export default Ingredients;
