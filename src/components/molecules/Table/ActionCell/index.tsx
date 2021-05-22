import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { Row } from 'react-table';
import { TableAction } from 'model/table/table-definitions';
import { BaseObject } from 'model/base-object';

type ActionCellProps<T extends BaseObject> = {
  name: string;
  row: Row<T>;
  actions: TableAction<T>[];
};

function ActionCell<T extends BaseObject>({ name, row, actions }: ActionCellProps<T>) {
  return (
    <Menu>
      <MenuButton as={Button}>{name}</MenuButton>

      <MenuList>
        {actions.map((action) => (
          <MenuItem key={action.name} onClick={() => action.callback(row)}>
            {action.name}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}

export default ActionCell;