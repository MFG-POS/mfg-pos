import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { Row } from 'react-table';
import { TableAction } from 'model/table/table-definitions';
import { BaseObject } from 'model/base-object';

type ActionCellProps<T extends BaseObject> = {
  name: string;
  row: Row<T>;
  actions: TableAction<T>[];
};

function ActionCell<T extends BaseObject>(props: ActionCellProps<T>) {
  return (
    <Menu>
      <MenuButton as={Button}>{props.name}</MenuButton>

      <MenuList>
        {props.actions.map((action) => (
          <MenuItem key={action.name} onClick={() => action.callback(props.row)}>
            {action.name}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}

export default ActionCell;
