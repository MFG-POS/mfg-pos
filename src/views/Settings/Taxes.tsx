import { ROUTE_SETTINGS_FORMS } from 'routing';
import { useMemo, useState } from 'react';
import { Row } from 'react-table';
import { TableTax } from 'model/table/table-types';
import { deleteDoc } from 'api/firebase/firestore/firestore-actions';
import { ColumnDefinition, TableAction } from 'model/table/table-definitions';
import AdvancedTable, { AdvancedTableProps } from 'components/organisms/AdvancedTable';
import { booleanDisplay, percent } from 'others/table-formats';
import { deleteTaxContent, deleteTaxHeader, deleteTaxToast } from 'others/modal-messages';

const Taxes = () => {
  // TODO: Dummy state for view refresh after item gets deleted. To be refactored with Redux.
  const [state, stateRefresher] = useState(false);

  const onRowDelete = (row: Row<TableTax>): void => {
    deleteDoc('taxes', row.original.id).then(() => stateRefresher(!state));
  };
  const onRowEdit = (row: Row<TableTax>): void => console.log(`Should edit row with id ${row.id}`);

  const actions: TableAction<TableTax>[] = useMemo(
    () => [
      { name: 'Edytuj', callback: onRowEdit },
      {
        name: 'Usuń',
        callback: onRowDelete,
        modalHeader: deleteTaxHeader,
        modalContent: deleteTaxContent,
        modalToast: deleteTaxToast,
      },
    ],
    [],
  );

  const columns: ColumnDefinition<TableTax>[] = useMemo(
    () => [
      {
        Header: 'Nazwa',
        accessor: 'name',
        minWidth: 200,
        canFilter: true,
      },
      {
        Header: 'Rodzaj',
        accessor: 'type',
        minWidth: 200,
        canFilter: true,
      },
      {
        Header: 'Wartość',
        accessor: 'value',
        minWidth: 200,
        canFilter: true,
        Cell: percent,
      },
      {
        Header: 'Czy jest fiskalny?',
        accessor: 'isFiscal',
        minWidth: 200,
        canFilter: false,
        Cell: booleanDisplay,
      },
      {
        Header: 'Akcje',
        accessor: 'actions',
        actions,
      },
    ],
    [actions],
  );

  const tableProps: AdvancedTableProps<TableTax> = {
    name: 'Podatki',
    collection: 'taxes',
    columns,
    buttonRoutePath: ROUTE_SETTINGS_FORMS.TAX.path,
    fetchRefresher: state,
  };

  return <AdvancedTable<TableTax> {...tableProps} />;
};

export default Taxes;
