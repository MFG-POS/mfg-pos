import React from 'react';
import { BoardTableInstance, TableDND } from 'model/board/board-table-instance';
import { useDrag } from 'react-dnd';
import { Box, Flex, IconButton, Menu, MenuButton, MenuItem, MenuList, useDisclosure } from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import BoardModal from 'components/atoms/BoardModal';

type BoardTableProps = BoardTableInstance & {
  deleteTable: (id: string) => void;
  updateSeats: (id: string, value: string) => void;
};

const BoardTable = ({ id, left, top, height, width, seats, deleteTable, updateSeats }: BoardTableProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: TableDND.TABLE,
      item: { id, left, top },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [id, left, top],
  );

  if (isDragging) return <Box ref={drag} />;

  return (
    <Box
      bg="gray.300"
      fontWeight="bold"
      position="absolute"
      cursor="pointer"
      borderWidth="1px"
      borderRadius="12px"
      borderColor="gray.400"
      _hover={{ boxShadow: 'md' }}
      width={width}
      height={height}
      left={left}
      top={top}
    >
      <BoardModal id={id} updateSeats={updateSeats} isOpen={isOpen} onClose={onClose} />
      <Menu>
        <MenuButton
          position="absolute"
          w="15px"
          h="15px"
          minW="unset"
          m="0.4em"
          variant="none"
          _focus={{
            outline: 'none',
            boxShadow: 'none',
          }}
          as={IconButton}
          icon={<EditIcon alt="Edycja stolika" />}
        />
        <MenuList>
          <MenuItem onClick={() => deleteTable(id)}>Usuń</MenuItem>
          <MenuItem onClick={onOpen}>Wskaż ilość miejsc</MenuItem>
        </MenuList>
      </Menu>
      <Flex justifyContent="center" alignItems="center" h="100%" ref={drag}>
        {seats}
      </Flex>
    </Box>
  );
};

export default BoardTable;
