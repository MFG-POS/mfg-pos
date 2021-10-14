import { Button, Menu, MenuButton, MenuItem, MenuList, Text, useDisclosure, useToast } from '@chakra-ui/react';
import { Row } from 'react-table';
import { TableAction } from 'model/table/table-definitions';
import { CommonDocument } from 'model/documents/common';
import { Link as RouterLink } from 'react-router-dom';
import { useContext } from 'react';
import { Route } from 'components/organisms/AdvancedTable';
import SimpleModal from 'components/atoms/SimpleModal';

type ActionCellProps<T extends CommonDocument> = {
  name: string;
  row: Row<T>;
  actions: TableAction<T>[];
};

function ActionCell<T extends CommonDocument>({ name, row, actions }: ActionCellProps<T>) {
  const toast = useToast();
  const { path } = useContext(Route);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDialogCallback = (action: TableAction<T>) => {
    toast({
      title: action.modalToast,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
    action.callback(row);
  };

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
            <>
              {action.modalHeader && action.modalContent && (
                <SimpleModal
                  isOpen={isOpen}
                  onClose={onClose}
                  header={action.modalHeader}
                  closeCallback={() => handleDialogCallback(action)}
                  content={<Text>{action.modalContent}</Text>}
                />
              )}
              <MenuItem key={action.name} onClick={onOpen}>
                {action.name}
              </MenuItem>
            </>
          ),
        )}
      </MenuList>
    </Menu>
  );
}

export default ActionCell;
