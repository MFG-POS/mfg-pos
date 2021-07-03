import React, { useEffect, useState } from 'react';
import { Box, Flex, useToast } from '@chakra-ui/react';
import BoardButtons from 'components/molecules/Board/BoardButtons';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Board, TablesHolder } from 'model/tableDND/table-instance';
import { v4 as uuidv4 } from 'uuid';
import { getBoard, updateBoard } from 'api/firebase/firestore/firestore-actions';
import BoardTables from 'components/molecules/Board/BoardTables';

type BoardHolderProps = {
  preview: boolean;
};

const BoardHolder = ({ preview }: BoardHolderProps) => {
  const toast = useToast();

  const initialTablesState: TablesHolder = {
    [uuidv4()]: { top: 0, left: 0, text: '0', width: 100, height: 50, borderRadius: 0 },
  };

  const [board, setBoard] = useState<Board>({
    id: uuidv4(),
    tables: initialTablesState,
  });

  useEffect(() => {
    getBoard().then((retrievedBoard) => setBoard(retrievedBoard));
  }, []);

  const moveTable = (id: string, left: number, top: number) => {
    const managedTables = board.tables;
    managedTables[id].left = left;
    managedTables[id].top = top;
    setBoard((prevState) => ({ id: prevState.id, tables: managedTables }));
  };

  const updateSeats = (id: string, value: string) => {
    const managedTables = board.tables;
    managedTables[id].text = value;
    setBoard((prevState) => ({ id: prevState.id, tables: managedTables }));
  };

  const clearBoard = () => {
    setBoard((prevState) => ({ id: prevState.id, tables: initialTablesState }));
  };

  const deleteTable = (index: string) => {
    const managedTables = board.tables;
    delete managedTables[index];
    setBoard((prevState) => ({ id: prevState.id, tables: managedTables }));
  };

  const addNewTable = () => {
    const left = Math.floor(Math.random() * 800) + 50;
    let top = Math.floor(Math.random() * 100) + 30;
    if (top > 80) top = 80;

    const managedTables = board.tables;
    managedTables[uuidv4()] = { top, left, text: `${4}`, width: 100, height: 50, borderRadius: 0 };
    setBoard((prevState) => ({ id: prevState.id, tables: managedTables }));
  };

  const saveTables = () => {
    updateBoard(board).then(() => {
      toast({
        title: 'Położenie stolików zostało zaktualizowane 🙌',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'bottom-right',
      });
    });
  };

  return (
    <Flex direction="column" h="70vh" w="140vh" p="5">
      {!preview && (
        <Box mb="2" h="15%" bg="gray.200">
          <BoardButtons addNewTable={() => addNewTable()} saveTables={saveTables} clearBoard={clearBoard} />
        </Box>
      )}
      <Box h="85%" bg="gray.100">
        <DndProvider backend={HTML5Backend}>
          <BoardTables
            tables={board.tables}
            deleteTable={deleteTable}
            moveTable={moveTable}
            updateSeats={updateSeats}
            preview={preview}
          />
        </DndProvider>
      </Box>
    </Flex>
  );
};

export default BoardHolder;
