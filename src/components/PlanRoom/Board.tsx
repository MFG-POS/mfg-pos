import { Box } from '@chakra-ui/react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Items from './RoomTables/Item';

const Board = () => (
  <Box
    id="board"
    h="400px"
    w="100%"
    border="1px solid black"
    bgImage="url('https://firebasestorage.googleapis.com/v0/b/mfg-pos.appspot.com/o/Board%2FbackGroundBoard.png?alt=media&token=76b04e32-6b94-4b6f-8dce-7cf512fe20a0')"
  >
    <DndProvider backend={HTML5Backend}>
      <Items />
    </DndProvider>
  </Box>
);

export default Board;
