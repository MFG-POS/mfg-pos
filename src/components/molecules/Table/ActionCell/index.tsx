import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { Row } from 'react-table';
import { TableAction } from 'model/table/table-definitions';
import { MenuDocument } from 'model/menu/menu';
import { Link as RouterLink } from 'react-router-dom';
import { useContext } from 'react';
import { Route } from 'components/organisms/AdvancedTable';

type ActionCellProps<T extends MenuDocument> = {
  name: string;
  row: Row<T>;
  actions: TableAction<T>[];
};

function ActionCell<T extends MenuDocument>({ name, row, actions }: ActionCellProps<T>) {
  const { path } = useContext(Route);
  return (
    <Menu>
      <MenuButton as={Button}>{name}</MenuButton>

      <MenuList>
        {actions.map((action) =>
          action.name === 'Edytuj' ? (
            <MenuItem
              key={action.name}
              as={RouterLink}
              to={{ pathname: path, state: { isEdit: true, id: row.original.id } }}
            >
              Edytuj
            </MenuItem>
          ) : (
            <MenuItem key={action.name} onClick={() => action.callback(row)}>
              {action.name}
            </MenuItem>
          ),
        )}
      </MenuList>
    </Menu>
  );
}

export default ActionCell;
