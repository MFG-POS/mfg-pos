import { Box, Image } from '@chakra-ui/react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import TableList from 'components/molecules/PlanRoom/RoomTables/Table';
import logo from 'assets/images/backGroundBoard.png';

const Board = () => (
  <Box position="relative" h="400px" w="100%" border="1px solid black">
    <Image src={logo} alt="" zIndex="0" position="absolute" h="398px" w="100%" />
    <Box zIndex="100" h="100%" w="100%">
      <DndProvider backend={HTML5Backend}>
        <TableList />
      </DndProvider>
    </Box>
  </Box>
);

export default Board;
