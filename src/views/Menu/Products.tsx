import { useMemo, useState } from 'react';
import { Row } from 'react-table';
import { TableProduct } from 'model/table/table-types';
import { ColumnDefinition, TableAction } from 'model/table/table-definitions';
import AdvancedTable, { AdvancedTableProps } from 'components/organisms/AdvancedTable';
import { ROUTE_MENU_FORMS } from 'routing';
import { taxesAndCategories } from 'others/references';
import { currency, percent } from 'others/table-formats';
import { deleteDoc } from 'api/firebase/firestore/firestore-actions';
import { deleteProductContent, deleteProductHeader, deleteProductToast } from 'others/modal-messages';

const Products = () => {
  // TODO: Dummy state for view refresh after item gets deleted. To be refactored with Redux.
  const [state, stateRefresher] = useState(false);

  const onRowDelete = (row: Row<TableProduct>): void => {
    deleteDoc('products', row.original.id).then(() => stateRefresher(!state));
  };
  const onRowEdit = (row: Row<TableProduct>): void => console.log(`Should edit row with id ${row.id}`);

  const actions: TableAction<TableProduct>[] = useMemo(
    () => [
      { name: 'Edytuj', callback: onRowEdit },
      {
        name: 'Usuń',
        callback: onRowDelete,
        modalHeader: deleteProductHeader,
        modalContent: deleteProductContent,
        modalToast: deleteProductToast,
      },
    ],
    [],
  );

  const columns: ColumnDefinition<TableProduct>[] = useMemo(
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
        Header: 'Podatek',
        accessor: 'tax.value',
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

  const tableProps: AdvancedTableProps<TableProduct> = {
    name: 'Artykuły',
    collection: 'products',
    columns,
    references: taxesAndCategories,
    buttonRoutePath: ROUTE_MENU_FORMS.PRODUCT.path,
    fetchRefresher: state,
  };

  return <AdvancedTable<TableProduct> {...tableProps} />;
};

export default Products;
