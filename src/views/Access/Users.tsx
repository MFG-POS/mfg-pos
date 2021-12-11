import { useMemo, useState } from 'react';
import { Row } from 'react-table';
import { ColumnDefinition, TableAction } from 'model/table/table-definitions';
import AdvancedTable, { AdvancedTableProps } from 'components/organisms/AdvancedTable';
import { ROUTE_ACCESS_FORMS } from 'routing';
import { TableUser } from 'model/table/table-types';
import { role } from 'others/table-formats';

const Users = () => {
  // TODO: Dummy state for view refresh after item gets deleted. To be refactored with Redux.
  const [state, stateRefresher] = useState(false);

  const onRowEdit = (row: Row<TableUser>): void => console.log(`Should edit row with id ${row.id}`);

  const actions: TableAction<TableUser>[] = useMemo(() => [{ name: 'Edytuj', callback: onRowEdit }], []);

  const columns: ColumnDefinition<TableUser>[] = useMemo(
    () => [
      {
        Header: 'Imię',
        accessor: 'name',
        minWidth: 300,
        canFilter: true,
      },
      {
        Header: 'Nazwisko',
        accessor: 'surname',
        minWidth: 300,
        canFilter: true,
      },
      {
        Header: 'Adres e-mail',
        accessor: 'email',
        minWidth: 300,
        canFilter: true,
      },
      {
        Header: 'Rola',
        accessor: 'role',
        minWidth: 300,
        canFilter: true,
        Cell: role,
      },
      {
        Header: 'Akcje',
        accessor: 'actions',
        actions,
      },
    ],
    [actions],
  );

  const tableProps: AdvancedTableProps<TableUser> = {
    name: 'Pracownicy',
    collection: 'users',
    columns,
    buttonRoutePath: ROUTE_ACCESS_FORMS.EMPLOYEES_FORM.path,
    showButton: false,
    fetchRefresher: state,
  };

  return <AdvancedTable<TableUser> {...tableProps} />;
};

export default Users;
