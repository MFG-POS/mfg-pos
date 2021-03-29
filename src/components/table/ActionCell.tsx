import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { Row } from 'react-table';
import { TableAction } from '../../model/table';

type ActionCellProps<T extends object> = {
  name: string;
  row: Row<T>;
  actions: TableAction<T>[];
};

function ActionCell<T extends object>(props: ActionCellProps<T>) {
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
