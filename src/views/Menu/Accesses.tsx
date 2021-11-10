import { useMemo, useState } from 'react';
import { Row } from 'react-table';
import { ColumnDefinition, TableAction } from 'model/table/table-definitions';
import AdvancedTable, { AdvancedTableProps } from 'components/organisms/AdvancedTable';
import { ROUTE_ACCESS_FORMS } from 'routing';
import { TableAccess } from 'model/table/table-types';
import { deleteDoc } from 'api/firebase/firestore/firestore-actions';
import { deleteEmployeeContent, deleteEmployeeHeader, deleteEmployeeToast } from 'others/modal-messages';

const Accesses = () => {
  // TODO: Dummy state for view refresh after item gets deleted. To be refactored with Redux.
  const [state, stateRefresher] = useState(false);

  const onRowDelete = (row: Row<TableAccess>): void => {
    deleteDoc('accesses', row.original.id).then(() => stateRefresher(!state));
  };

  const onRowEdit = (row: Row<TableAccess>): void => console.log(`Should edit row with id ${row.id}`);

  const actions: TableAction<TableAccess>[] = useMemo(
    () => [
      { name: 'Edytuj', callback: onRowEdit },
      {
        name: 'Usuń',
        callback: onRowDelete,
        modalHeader: deleteEmployeeHeader,
        modalContent: deleteEmployeeContent,
        modalToast: deleteEmployeeToast,
      },
    ],
    [],
  );

  const columns: ColumnDefinition<TableAccess>[] = useMemo(
    () => [
      {
        Header: 'Imię',
        accessor: 'name',
        minWidth: 300,
        canFilter: true,
      },
      {
        Header: 'Nazwisko',
        accessor: 'parent',
        minWidth: 300,
        canFilter: true,
      },
      {
        Header: 'PIN',
        accessor: 'tax',
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

  const tableProps: AdvancedTableProps<TableAccess> = {
    name: 'Dostępy',
    collection: 'accesses',
    columns,
    buttonRoutePath: ROUTE_ACCESS_FORMS.EMPLOYEES_FORM.path,
    fetchRefresher: state,
  };

  return <AdvancedTable<TableAccess> {...tableProps} />;
};

export default Accesses;
