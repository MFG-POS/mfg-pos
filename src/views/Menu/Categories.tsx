import { useMemo } from 'react';
import { Row } from 'react-table';
import { ColumnDefinition, TableAction } from 'model/table/table-definitions';
import AdvancedTable, { AdvancedTableProps } from 'components/organisms/AdvancedTable';
import { ROUTE_MENU_FORMS } from 'routing';
import { TableCategory } from 'model/table/table-types';

const Categories = () => {
  const onRowDelete = (row: Row<TableCategory>): void => console.log(`Should delete row with id ${row.id}`);
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
  };

  return <AdvancedTable<TableCategory> {...tableProps} />;
};

export default Categories;
