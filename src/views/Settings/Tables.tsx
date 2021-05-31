import { VStack, Box, Flex } from '@chakra-ui/react';
import RoomTitle from '../../components/PlanRoom/RoomTitle';
import SaveBoard from '../../components/PlanRoom/SaveBoard';
import Board from '../../components/PlanRoom/Board';

const Tables = () => (
  <Box w="100%" minWidth="30em" h="36em">
    <Flex w="100%" p="1em">
      <VStack w="100%" spacing={3} align="stretch">
        <Box h="2em">
          <RoomTitle />
        </Box>
        <Box h="3.2em" w="100%" px="2em">
          <SaveBoard />
        </Box>
        <Box h="26em" w="100%" px="2em">
          <Board />
        </Box>
      </VStack>
    </Flex>
  </Box>
);
export default Tables;
