import { useMemo } from 'react';
import { Row } from 'react-table';
import { TableDish } from 'model/table/table-types';
import { ColumnDefinition, TableAction } from 'model/table/table-definitions';
import AdvancedTable, { AdvancedTableProps } from 'components/organisms/AdvancedTable';
import { ROUTE_MENU_FORMS } from 'routing';
import { taxesAndCategories } from 'others/references';
import { currency, percent } from 'others/table-formats';

const Dishes = () => {
  const onRowDelete = (row: Row<TableDish>): void => console.log(`Should delete row with id ${row.id}`);
  const onRowEdit = (row: Row<TableDish>): void => console.log(`Should edit row with id ${row.id}`);

  const actions: TableAction<TableDish>[] = useMemo(
    () => [
      { name: 'Edytuj', callback: onRowEdit },
      { name: 'Usuń', callback: onRowDelete },
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
  };

  return <AdvancedTable<TableDish> {...tableProps} />;
};

export default Dishes;
