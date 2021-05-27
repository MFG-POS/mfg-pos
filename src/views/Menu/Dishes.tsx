import React, { useMemo } from 'react';
import { Row } from 'react-table';
import { TableDish } from 'model/table/table-types';
import { ColumnDefinition, TableAction } from 'model/table/table-definitions';
import AdvancedTable, { AdvancedTableProps } from 'components/organisms/AdvancedTable';
import { ROUTE_MENU_FORMS } from 'routing';

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
        accessor: 'imagePath',
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
        Header: 'Koszt brutto',
        accessor: 'grossPrice',
        minWidth: 200,
        canFilter: true,
      },
      {
        Header: 'Koszt netto',
        accessor: 'netPrice',
        minWidth: 200,
        canFilter: true,
      },
      {
        Header: 'Waga netto',
        accessor: 'netWeight',
        minWidth: 200,
        canFilter: true,
      },
      {
        Header: 'Narzut',
        accessor: 'overhead',
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

  const tableProps: AdvancedTableProps<TableDish> = {
    name: 'Dania',
    collection: 'dishes',
    columns,
    buttonRoutePath: ROUTE_MENU_FORMS.DISH.path,
  };

  return <AdvancedTable<TableDish> {...tableProps} />;
};

export default Dishes;
