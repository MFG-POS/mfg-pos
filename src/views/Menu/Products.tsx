import { useMemo } from 'react';
import { Row } from 'react-table';
import { TableProduct } from 'model/table/table-types';
import { ColumnDefinition, TableAction } from 'model/table/table-definitions';
import AdvancedTable, { AdvancedTableProps } from 'components/organisms/AdvancedTable';
import { ROUTE_MENU_FORMS } from 'routing';

const Products = () => {
  const onRowDelete = (row: Row<TableProduct>): void => console.log(`Should delete row with id ${row.id}`);
  const onRowEdit = (row: Row<TableProduct>): void => console.log(`Should edit row with id ${row.id}`);

  const actions: TableAction<TableProduct>[] = useMemo(
    () => [
      { name: 'Edytuj', callback: onRowEdit },
      { name: 'Usuń', callback: onRowDelete },
    ],
    [],
  );

  const columns: ColumnDefinition<TableProduct>[] = useMemo(
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

  const tableProps: AdvancedTableProps<TableProduct> = {
    name: 'Artykuły',
    collection: 'products',
    columns,
    buttonRoutePath: ROUTE_MENU_FORMS.PRODUCT.path,
  };

  return <AdvancedTable<TableProduct> {...tableProps} />;
};

export default Products;
