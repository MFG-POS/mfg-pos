import React, { useEffect, useState } from 'react';
import { Box, Flex, useToast } from '@chakra-ui/react';
import BoardButtons from 'components/molecules/Board/BoardButtons';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { BoardTableInstance } from 'model/board/board-table-instance';
import { getTables, updateTables } from 'api/firebase/firestore/firestore-actions';
import BoardTables from 'components/molecules/Board/BoardTables';
import { v4 as uuidv4 } from 'uuid';

const BoardHolder = () => {
  const toast = useToast();

  const [tables, setTables] = useState<BoardTableInstance[]>([]);

  useEffect(() => {
    getTables().then((retrievedTables) => setTables(retrievedTables));
  }, []);

  const getTable = (id: string): BoardTableInstance => tables.find((table) => table.id === id)!;
  const filterTables = (id: string): BoardTableInstance[] => tables.filter((table) => table.id !== id)!;

  const createTable = (id: string): BoardTableInstance => ({
    id,
    top: 0,
    left: 0,
    seats: 4,
    width: 100,
    height: 50,
    borderRadius: 0,
  });

  const moveTable = (id: string, left: number, top: number) => {
    const table = getTable(id);
    table.left = left;
    table.top = top;
    setTables(() => [...filterTables(id), table]);
  };

  const updateSeats = (id: string, value: string) => {
    const table = getTable(id);
    table.seats = Number(value);
    setTables(() => [...filterTables(id), table]);
  };

  const clearBoard = () => {
    setTables(() => [createTable(uuidv4())]);
  };

  const deleteTable = (id: string) => {
    setTables(() => [...filterTables(id)]);
  };

  const addNewTable = () => {
    const left = Math.floor(Math.random() * 800) + 50;
    let top = Math.floor(Math.random() * 100) + 30;
    if (top > 80) top = 80;
    setTables((previousState) => [...previousState, { ...createTable(uuidv4()), top, left }]);
  };

  const saveTables = () => {
    updateTables(tables).then(() => {
      toast({
        title: 'Położenie stolików zostało zaktualizowane 🙌',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    });
  };

  return (
    <Flex direction="column" h="70vh" w="140vh" p="5">
      <Box mb="2" h="15%" bg="gray.200">
        <BoardButtons addNewTable={() => addNewTable()} saveTables={saveTables} clearBoard={clearBoard} />
      </Box>
      <Box h="85%" bg="gray.100">
        <DndProvider backend={HTML5Backend}>
          <BoardTables tables={tables} deleteTable={deleteTable} moveTable={moveTable} updateSeats={updateSeats} />
        </DndProvider>
      </Box>
    </Flex>
  );
};

export default BoardHolder;
