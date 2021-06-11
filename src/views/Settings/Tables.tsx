import { VStack, Box, Flex, Text } from '@chakra-ui/react';
import Buttons from 'components/molecules/PlanRoom/Buttons';
import Board from 'components/molecules/PlanRoom/Board';

const Tables = () => (
  <Box w="100%" minWidth="30em" h="36em">
    <Flex w="100%" p="1em">
      <VStack w="100%" spacing="3" align="stretch">
        <Text bg="white" h="4em" w="50%" px="2em" py="0.2em" color="black" fontWeight="bold">
          Plan sali
        </Text>
        <Box h="3.2em" w="100%" px="2em">
          <Buttons />
        </Box>
        <Box h="26em" w="100%" px="2em">
          <Board />
        </Box>
      </VStack>
    </Flex>
  </Box>
);
export default Tables;
